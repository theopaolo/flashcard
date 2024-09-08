let flashcards = [];
let score = 0;

// Fetch the JSON data
async function loadQuizData() {
  try {
    const response = await fetch('deck-evaluation-eden.json'); // Update with actual path
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    flashcards = await response.json();
    renderQuiz();
  } catch (error) {
    console.error('Failed to load the quiz data:', error);
  }
}

// Function to render the quiz
function renderQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear any existing content

  flashcards.flashcards.forEach((card, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `<p>${card.question}</p>`;

    const choicesDiv = document.createElement('div');
    choicesDiv.classList.add('choices');

    card.choices.forEach((choice, choiceIndex) => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="radio" name="question${index}" value="${choice}">
        <span class="answer-letter">${String.fromCharCode(65 + choiceIndex)}</span>
        ${choice}
      `;
      choicesDiv.appendChild(label);
    });

    // Append choices and result container
    questionDiv.appendChild(choicesDiv);

    // Create an element to display the result for this question later
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    questionDiv.appendChild(resultDiv);

    quizContainer.appendChild(questionDiv);
  });

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

// Function to evaluate answers
function evaluateAnswers() {
  flashcards.flashcards.forEach((card, index) => {
    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    const resultDiv = document.querySelector(`.question:nth-child(${index + 1}) .result`);

    if (selected) {
      if (selected.value === card.reponse) {
        resultDiv.innerHTML = `<p class="correct">C'est la bonne réponse!</p>`;
        score++;
      } else {
        resultDiv.innerHTML = `<p class="incorrect">Oops! La bonne réponse est: ${card.reponse}</p>`;
      }
    } else {
      resultDiv.innerHTML = `<p class="no-answer">Pas de réponse ? La bonne est : ${card.reponse}</p>`;
    }
  });

  document.getElementById('results').innerText = `Ton score: ${score}/${flashcards.flashcards.length}`;
}

document.getElementById('submit').addEventListener('click', () => {
  score = 0; // Reset score each time
  evaluateAnswers();
});

// Load quiz data and render the quiz
loadQuizData();