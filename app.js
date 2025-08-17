// Flashcard data and state
let flashcardsData = [];
let currentCardIndex = 0;
let isShowingQuestion = true;
let isRandomMode = false;
let pickedCards = new Set();

// DOM elements
const flashcardElement = document.getElementById("flashcard");
const flashcardContentElement = document.getElementById("flashcard-content");
const flashcardCategoryElement = document.getElementById("flashcard-category");
const choicesElement = document.getElementById("flashcard-choices");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const flipButton = document.getElementById("flip-btn");
const randomToggle = document.getElementById("random-toggle");
const cardCounterElement = document.getElementById("card-counter");
const cardNumberElement = document.getElementById("card-number");
const deckSelect = document.getElementById("deck-select");
const takeQuizBtn = document.getElementById("take-quiz-btn");

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Cached regex patterns for better performance
const CODE_BLOCK_PATTERN = /```(\w+)?\n([\s\S]*?)```/g;
const INLINE_CODE_PATTERN = /`([^`]+)`/g;

// Function to detect and highlight code blocks
function highlightCode(text) {
  if (!text) return '';

  // Reset regex patterns for reuse
  CODE_BLOCK_PATTERN.lastIndex = 0;
  INLINE_CODE_PATTERN.lastIndex = 0;

  // Replace code blocks with highlighted versions
  let result = text.replace(CODE_BLOCK_PATTERN, (match, language, code) => {
    const lang = language || 'javascript'; // Default to JavaScript
    return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Replace inline code with highlighted versions
  result = result.replace(INLINE_CODE_PATTERN, (match, code) => {
    return `<code class="language-javascript">${escapeHtml(code)}</code>`;
  });

  // Convert line breaks to <br> for non-code content
  if (!result.includes('<pre>') && !result.includes('<code>')) {
    result = result.replace(/\n/g, '<br>');
  }

  return result;
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showNextCard() {
  isShowingQuestion = true;
  currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
  clearFeedback();
  updateCardContent();
  // Navigation buttons state doesn't change when moving between cards
}

function showPrevCard() {
  isShowingQuestion = true;
  currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
  clearFeedback();
  updateCardContent();
  // Navigation buttons state doesn't change when moving between cards
}

function updateCardContent() {
  const currentCard = flashcardsData[currentCardIndex];
  if (!currentCard) {
    console.error('No card found at index:', currentCardIndex);
    return;
  }

  let content;

  if (isShowingQuestion) {
    content = currentCard.question;
  } else {
    // Show explanation if available, otherwise fall back to reponse
    if (currentCard.explanation) {
      content = currentCard.explanation;
    } else if (currentCard.correct_choice_index !== undefined && currentCard.choices) {
      // If using new system, show the correct choice + explanation
      const correctChoice = currentCard.choices[currentCard.correct_choice_index];
      const explanation = currentCard.explanation || '';
      content = explanation ? `${correctChoice}\n\n${explanation}` : correctChoice;
    } else {
      content = currentCard.reponse;
    }
  }

  // Apply syntax highlighting to content
  flashcardContentElement.innerHTML = highlightCode(content);
  flashcardCategoryElement.textContent = `Category: ${currentCard.category}`;

    // Update choices
  if (isShowingQuestion && currentCard.choices) {
    choicesElement.innerHTML = currentCard.choices.map((choice, index) =>
      `<li class="choice" data-choice="${choice}" data-index="${index}">${String.fromCharCode(65 + index)}. ${highlightCode(choice)}</li>`
    ).join('');
    choicesElement.style.display = 'block';
  } else {
    choicesElement.style.display = 'none';
  }

  if (isShowingQuestion) {
    flashcardElement.classList.remove('answer');
  } else {
    flashcardElement.classList.add('answer');
  }

  // Update card number
  cardNumberElement.textContent = `Card ${currentCardIndex + 1} of ${flashcardsData.length}`;

  // Re-highlight syntax after DOM update
  if (typeof Prism !== 'undefined') {
    Prism.highlightAllUnder(flashcardElement);
  }
}

function toggleRandomMode() {
  isRandomMode = !isRandomMode;
  randomToggle.textContent = isRandomMode ? "Mode Aléatoire: Activé" : "Mode Aléatoire: Désactivé";
  if (isRandomMode) {
    shuffleArray(flashcardsData);
    pickedCards.clear(); // Reset picked cards when shuffling
  }
  currentCardIndex = 0;
  isShowingQuestion = true;
  updateCardContent();
  // Navigation buttons state only needs to be updated when deck changes, not on mode toggle
}

function updateNavigationButtons() {
  prevButton.disabled = flashcardsData.length <= 1;
  nextButton.disabled = flashcardsData.length <= 1;
  flipButton.disabled = flashcardsData.length === 0;
}

function flipCard() {
  if (flashcardsData.length > 0) {
    isShowingQuestion = !isShowingQuestion;
    updateCardContent();
  }
}

function isAnswerCorrect(selectedAnswer, currentCard) {
  // Use new robust system: if card has correct_choice_index, use it
  if (currentCard.correct_choice_index !== undefined && currentCard.choices) {
    const correctChoice = currentCard.choices[currentCard.correct_choice_index];
    return selectedAnswer === correctChoice;
  }

  // Fallback to old system for compatibility
  // First try exact match
  if (selectedAnswer === currentCard.reponse) {
    return true;
  }

  // If no exact match, check if the correct answer starts with the selected answer
  // This handles cases where the reponse field contains explanatory text
  if (currentCard.reponse.startsWith(selectedAnswer)) {
    return true;
  }

  // Also check if any choice appears at the beginning of the correct answer
  return currentCard.reponse.toLowerCase().startsWith(selectedAnswer.toLowerCase());
}

function handleAnswerSelection(selectedAnswer) {
  const currentCard = flashcardsData[currentCardIndex];
  const isCorrect = isAnswerCorrect(selectedAnswer, currentCard);

  // Show feedback immediately
  showAnswerFeedback(isCorrect);

  // Flip to answer after a short delay
  setTimeout(() => {
    isShowingQuestion = false;
    updateCardContent();
  }, 1500);
}

function showAnswerFeedback(isCorrect) {
  // Remove any existing feedback classes
  flashcardElement.classList.remove('correct-answer', 'incorrect-answer');

  if (isCorrect) {
    flashcardElement.classList.add('correct-answer');
  } else {
    flashcardElement.classList.add('incorrect-answer');
  }
}

function clearFeedback() {
  flashcardElement.classList.remove('correct-answer', 'incorrect-answer');
}

// Event listeners
// Removed automatic card flipping on click for better UX

nextButton.addEventListener("click", showNextCard);
prevButton.addEventListener("click", showPrevCard);
flipButton.addEventListener("click", flipCard);
randomToggle.addEventListener("click", toggleRandomMode);

// Use event delegation for choice clicks to avoid repeated listener setup
choicesElement.addEventListener("click", (event) => {
  const choice = event.target.closest('.choice');
  if (choice && choice.dataset.choice) {
    handleAnswerSelection(choice.dataset.choice);
  }
});

document.addEventListener("keydown", (event) => {
  if (flashcardsData.length > 0) {
    if (event.code === "Space") {
      event.preventDefault();
      flipCard();
    } else if (event.code === "ArrowRight") {
      event.preventDefault();
      showNextCard();
    } else if (event.code === "ArrowLeft") {
      event.preventDefault();
      showPrevCard();
    }
  }
});

function loadDeck(deckFile) {
  console.log('Loading deck:', deckFile);

  // Show loading state
  flashcardContentElement.textContent = "Chargement en cours...";
  disableAllButtons();

  fetch(`decks/${deckFile}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Validate data structure
      if (!data.flashcards || !Array.isArray(data.flashcards) || data.flashcards.length === 0) {
        throw new Error('Invalid deck format or empty deck');
      }

      flashcardsData = data.flashcards;
      currentCardIndex = 0;
      isShowingQuestion = true;
      pickedCards.clear();
      console.log('Deck loaded, cards:', flashcardsData.length);

      enableAllButtons();
      updateCardContent();
      updateNavigationButtons();

      // Store selected deck in localStorage for quiz
      localStorage.setItem('selectedDeck', deckFile);
    })
    .catch((error) => {
      console.error("Error fetching flashcards:", error);
      flashcardContentElement.textContent =
        `Erreur lors du chargement: ${error.message}. Veuillez réessayer.`;
      disableAllButtons();
    });
}

function disableAllButtons() {
  nextButton.disabled = true;
  prevButton.disabled = true;
  flipButton.disabled = true;
  randomToggle.disabled = true;
  takeQuizBtn.disabled = true;
}

function enableAllButtons() {
  nextButton.disabled = false;
  prevButton.disabled = false;
  flipButton.disabled = false;
  randomToggle.disabled = false;
  takeQuizBtn.disabled = false;
}

deckSelect.addEventListener("change", (e) => {
  loadDeck(e.target.value);
});

takeQuizBtn.addEventListener("click", () => {
  // Store selected deck again for safety
  localStorage.setItem('selectedDeck', deckSelect.value);
  window.location.href = 'quiz.html';
});

// On page load, load the default deck and set localStorage
window.addEventListener('DOMContentLoaded', () => {
  const defaultDeck = deckSelect.value;
  loadDeck(defaultDeck);
  localStorage.setItem('selectedDeck', defaultDeck);
});