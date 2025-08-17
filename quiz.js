let flashcards = [];
let score = 0;

// Fetch the JSON data
async function loadQuizData() {
  try {
    // Try to get the selected deck from localStorage
    let deckFile = localStorage.getItem('selectedDeck') || 'deck-evaluation-eden.json';
    const response = await fetch('decks/' + deckFile);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Loaded quiz data:', data);
    // Support both array and object deck formats
    if (Array.isArray(data)) {
      flashcards = data;
    } else if (Array.isArray(data.flashcards)) {
      flashcards = data.flashcards;
    } else {
      flashcards = [];
    }
    renderQuiz();
  } catch (error) {
    console.error('Failed to load the quiz data:', error);
  }
}

// Function to render the quiz
function renderQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear any existing content

  flashcards.forEach((card, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `<p>${highlightCode(card.question)}</p>`;

    const choicesDiv = document.createElement('div');
    choicesDiv.classList.add('choices');

    if (card.choices) {
      card.choices.forEach((choice, choiceIndex) => {
        const label = document.createElement('label');
        label.innerHTML = `
          <input type="radio" name="question${index}" value="${choice}">
          <span class="answer-letter">${String.fromCharCode(65 + choiceIndex)}</span>
          ${highlightCode(choice)}
        `;
        choicesDiv.appendChild(label);
      });
    }

    // Append choices and result container
    questionDiv.appendChild(choicesDiv);

    // Create an element to display the result for this question later
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    questionDiv.appendChild(resultDiv);

    quizContainer.appendChild(questionDiv);
  });

  // Highlight syntax after rendering
  if (typeof Prism !== 'undefined') {
    Prism.highlightAllUnder(quizContainer);
  }

  // Add event listener to track selection
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      document.querySelectorAll(`input[name="${event.target.name}"]`).forEach((el) => {
        el.closest('label').classList.remove('selected');
      });
      event.target.closest('label').classList.add('selected');
    });
  });
}

function isAnswerCorrect(selectedAnswer, card) {
  // Use new robust system: if card has correct_choice_index, use it
  if (card.correct_choice_index !== undefined && card.choices) {
    const correctChoice = card.choices[card.correct_choice_index];
    return selectedAnswer === correctChoice;
  }
  
  // Fallback to old system for compatibility
  // First try exact match
  if (selectedAnswer === card.reponse) {
    return true;
  }
  
  // If no exact match, check if the correct answer starts with the selected answer
  // This handles cases where the reponse field contains explanatory text
  if (card.reponse.startsWith(selectedAnswer)) {
    return true;
  }
  
  // Also check if any choice appears at the beginning of the correct answer
  return card.reponse.toLowerCase().startsWith(selectedAnswer.toLowerCase());
}

function getCorrectAnswerText(card) {
  // Use new system if available
  if (card.correct_choice_index !== undefined && card.choices) {
    const correctChoice = card.choices[card.correct_choice_index];
    const explanation = card.explanation || '';
    return explanation ? `${correctChoice} - ${explanation}` : correctChoice;
  }
  
  // Fallback to old system
  return card.reponse;
}

// Function to evaluate answers
function evaluateAnswers() {
  flashcards.forEach((card, index) => {
    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    const resultDiv = document.querySelector(`.question:nth-child(${index + 1}) .result`);

    if (selected) {
      if (isAnswerCorrect(selected.value, card)) {
        resultDiv.innerHTML = `<p class="correct">C'est la bonne réponse!</p>`;
        score++;
      } else {
        const correctAnswerText = getCorrectAnswerText(card);
        resultDiv.innerHTML = `<p class="incorrect">Oops! La bonne réponse est: ${highlightCode(correctAnswerText)}</p>`;
      }
    } else {
      const correctAnswerText = getCorrectAnswerText(card);
      resultDiv.innerHTML = `<p class="no-answer">Pas de réponse ? La bonne est : ${highlightCode(correctAnswerText)}</p>`;
    }
  });

  // Re-highlight syntax in results
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }

  document.getElementById('results').innerText = `Ton score: ${score}/${flashcards.length}`;
}

// Function to detect and highlight code blocks (same as in app.js)
function highlightCode(text) {
  if (!text) return '';

  // Code block patterns
  const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g;
  const inlineCodePattern = /`([^`]+)`/g;

  // Replace code blocks with highlighted versions
  let result = text.replace(codeBlockPattern, (match, language, code) => {
    const lang = language || 'javascript'; // Default to JavaScript
    return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Replace inline code with highlighted versions
  result = result.replace(inlineCodePattern, (match, code) => {
    return `<code class="language-javascript">${escapeHtml(code)}</code>`;
  });

  // Convert line breaks to <br> for non-code content
  if (!result.includes('<pre>') && !result.includes('<code>')) {
    result = result.replace(/\n/g, '<br>');
  }

  return result;
}

// Helper function to escape HTML (same as in app.js)
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.getElementById('submit').addEventListener('click', () => {
  score = 0; // Reset score each time
  evaluateAnswers();
});

// Load quiz data and render the quiz
loadQuizData();