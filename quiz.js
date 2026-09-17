const LETTERS = 'ABCDEFGH';
const $ = (id) => document.getElementById(id);

const deckFile =
  new URLSearchParams(location.search).get('deck') ||
  localStorage.getItem('selectedDeck') ||
  'docker-quiz-30.json';

let quiz = null;
let current = 0;

async function loadQuiz() {
  const res = await fetch('decks/' + deckFile);
  if (!res.ok) throw new Error(`decks/${deckFile} : HTTP ${res.status}`);
  quiz = normalize(await res.json());
  // Runtime state per question, on top of the deck data
  quiz.questions.forEach((q) => Object.assign(q, {
    shuffledOptions: shuffle(q.options),
    studentAnswer: null,
    wrongAnswers: [],
    attempts: 0,
    hintShown: false,
    answered: false,
    score: 0,
  }));
  render();
}

// Old flashcard decks ({ flashcards: [{ question, choices, reponse, correct_choice_index }] })
// are mapped to the quiz shape so "Quiz sur ce deck" keeps working. Cards whose
// `reponse` matches no choice have no resolvable answer and are left out.
function normalize(data) {
  if (data.questions) return data;
  const plain = (t) => (t || '').replace(/`/g, '').trim().toLowerCase();
  const cards = (data.flashcards || []).filter((c) => Array.isArray(c.choices) && c.choices.length);
  const questions = [];
  for (const c of cards) {
    const correct = c.correct_choice_index ?? c.choices.findIndex((ch) => plain(c.reponse).startsWith(plain(ch)));
    if (correct < 0) continue;
    questions.push({
      id: `q${questions.length + 1}`,
      difficulty: c.category,
      question: c.question,
      options: c.choices.map((label, j) => ({ id: LETTERS[j], label })),
      correctAnswer: LETTERS[correct],
      hint: '',
      explanation: c.explanation || '',
    });
  }
  if (questions.length < cards.length) {
    console.warn(`${cards.length - questions.length} carte(s) sans réponse résolvable, exclue(s) du quiz : ajouter correct_choice_index dans ${deckFile}`);
  }
  return { title: 'Quiz', questions };
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function totalScore() {
  return quiz.questions.reduce((s, q) => s + q.score, 0);
}

function render() {
  const q = quiz.questions[current];
  const total = quiz.questions.length;

  $('quiz-title').textContent = quiz.title || 'Quiz';
  $('progress').textContent = `${current + 1} / ${total}`;
  $('score').textContent = `score ${totalScore()}`;

  $('meta').textContent = [q.difficulty, ...(q.topics || [])].filter(Boolean).join(', ');
  $('question').innerHTML = highlightCode(q.question);

  $('options').innerHTML = q.shuffledOptions.map((o, i) => {
    const cls = ['option'];
    if (q.answered && o.id === q.correctAnswer) cls.push('correct');
    if (q.wrongAnswers.includes(o.id)) cls.push('wrong');
    const disabled = q.answered || q.wrongAnswers.includes(o.id) ? 'disabled' : '';
    return `<button class="${cls.join(' ')}" data-id="${o.id}" ${disabled}>
      <span class="letter">${LETTERS[i]}</span>
      <span class="label">${highlightCode(o.label)}</span>
    </button>`;
  }).join('');

  $('hint').hidden = !q.hintShown || !q.hint;
  $('hint').innerHTML = q.hint ? `Indice : ${highlightCode(q.hint)}` : '';
  $('hint-btn').hidden = q.answered || q.hintShown || !q.hint;

  $('feedback').hidden = !q.answered;
  if (q.answered) {
    const correctLabel = q.options.find((o) => o.id === q.correctAnswer).label;
    const verdict = q.score === 1 ? 'Juste.'
      : q.score > 0 ? 'Juste au deuxième essai.'
      : `Faux. Réponse : ${highlightCode(correctLabel)}`;
    $('feedback').className = `feedback ${q.score > 0 ? 'ok' : 'ko'}`;
    $('feedback').innerHTML = `<p class="verdict">${verdict}</p>` +
      (q.explanation ? `<p class="explanation">${highlightCode(q.explanation)}</p>` : '');
  }

  $('next-btn').hidden = !q.answered;
  $('next-btn').innerHTML = (current + 1 < total ? 'Suivant' : 'Résultat') + ' <kbd>↵</kbd>';

  $('question-card').hidden = false;
  if (typeof Prism !== 'undefined') Prism.highlightAllUnder($('question-card'));
}

function answer(optionId) {
  const q = quiz.questions[current];
  if (q.answered || q.wrongAnswers.includes(optionId)) return;
  q.attempts++;
  q.studentAnswer = optionId;
  if (optionId === q.correctAnswer) {
    q.answered = true;
    // ponytail: 1 point first try, 0.5 second try, 0 after. Tune here if the scale changes.
    q.score = q.attempts === 1 ? 1 : q.attempts === 2 ? 0.5 : 0;
  } else {
    q.wrongAnswers.push(optionId);
    q.hintShown = true;
    if (q.wrongAnswers.length >= q.options.length - 1) q.answered = true;
  }
  render();
}

function showHint() {
  quiz.questions[current].hintShown = true;
  render();
}

function next() {
  if (!quiz.questions[current].answered) return;
  if (current + 1 < quiz.questions.length) {
    current++;
    render();
  } else {
    showResults();
  }
}

function showResults() {
  const total = quiz.questions.length;
  const missed = quiz.questions.filter((q) => q.score < 1);
  $('question-card').hidden = true;
  $('progress').textContent = 'Terminé';
  $('score').textContent = '';
  $('results').hidden = false;
  $('results').innerHTML = `
    <p class="final-score">Score final : ${totalScore()} / ${total}</p>
    ${missed.length ? `<p class="meta">À revoir : ${missed.length}</p><ol class="missed">` +
      missed.map((q) => `<li>${highlightCode(q.question)}<br>
        <span class="missed-answer">${highlightCode(q.options.find((o) => o.id === q.correctAnswer).label)}</span></li>`).join('') +
      '</ol>' : '<p>Sans faute.</p>'}
    <div class="controls"><button id="restart-btn" class="text">Recommencer</button></div>`;
  $('restart-btn').addEventListener('click', () => location.reload());
  if (typeof Prism !== 'undefined') Prism.highlightAllUnder($('results'));
}

$('options').addEventListener('click', (e) => {
  const btn = e.target.closest('.option');
  if (btn) answer(btn.dataset.id);
});
$('hint-btn').addEventListener('click', showHint);
$('next-btn').addEventListener('click', next);

document.addEventListener('keydown', (e) => {
  if (!quiz || !$('results').hidden) return;
  const key = e.key.toUpperCase();
  const q = quiz.questions[current];
  const idx = LETTERS.indexOf(key);
  if (idx > -1 && idx < q.shuffledOptions.length) answer(q.shuffledOptions[idx].id);
  else if (key === 'H') showHint();
  else if (e.key === 'Enter' || e.key === 'ArrowRight') next();
});

// Inline `code` and ```blocks``` to Prism-ready HTML (same rules as app.js)
function highlightCode(text) {
  if (!text) return '';
  let result = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (m, lang, code) =>
    `<pre><code class="language-${lang || 'javascript'}">${escapeHtml(code.trim())}</code></pre>`);
  result = result.replace(/`([^`]+)`/g, (m, code) => `<code>${escapeHtml(code)}</code>`);
  if (!result.includes('<pre>')) result = result.replace(/\n/g, '<br>');
  return result;
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

loadQuiz().catch((err) => {
  console.error(err);
  $('question-card').hidden = false;
  $('question').textContent = `Impossible de charger le quiz : ${err.message}`;
});
