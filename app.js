// Flashcard data and state
let flashcardsData = [];
let currentCardIndex = 0;
let isShowingQuestion = true;
let isRandomMode = false;

// DOM elements
const flashcardElement = document.getElementById("flashcard");
const flashcardContentElement = document.getElementById("flashcard-content");
const flashcardCategoryElement = document.getElementById("flashcard-category");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const randomToggle = document.getElementById("random-toggle");

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showNextCard() {
  isShowingQuestion = true;
  currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
  updateCardContent();
  updateNavigationButtons();
}

function showPrevCard() {
  isShowingQuestion = true;
  currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
  updateCardContent();
  updateNavigationButtons();
}

function updateCardContent() {
  const currentCard = flashcardsData[currentCardIndex];
  flashcardContentElement.textContent = isShowingQuestion
    ? currentCard.question
    : currentCard.reponse;
  flashcardCategoryElement.textContent = `Category: ${currentCard.category}`;

  if (isShowingQuestion) {
    flashcardElement.classList.remove('answer');
  } else {
    flashcardElement.classList.add('answer');
  }
}

function toggleRandomMode() {
  isRandomMode = !isRandomMode;
  randomToggle.textContent = isRandomMode ? "Mode Aléatoire: Activé" : "Mode Aléatoire: Désactivé";
  if (isRandomMode) {
    shuffleArray(flashcardsData);
  }
  currentCardIndex = 0;
  isShowingQuestion = true;
  updateCardContent();
  updateNavigationButtons();
}

function updateNavigationButtons() {
  prevButton.disabled = flashcardsData.length <= 1;
  nextButton.disabled = flashcardsData.length <= 1;
}

// Event listeners
flashcardElement.addEventListener("click", () => {
  if (flashcardsData.length > 0) {
    isShowingQuestion = !isShowingQuestion;
    updateCardContent();
  }
});

nextButton.addEventListener("click", showNextCard);
prevButton.addEventListener("click", showPrevCard);
randomToggle.addEventListener("click", toggleRandomMode);

document.addEventListener("keydown", (event) => {
    if (flashcardsData.length > 0) {
      if (event.code === "Space") {
        event.preventDefault();
        isShowingQuestion = !isShowingQuestion;
        updateCardContent();
      } else if (event.code === "ArrowRight") {
        event.preventDefault();
        showNextCard();
      } else if (event.code === "ArrowLeft") {
        event.preventDefault();
        showPrevCard();
      }
    }
});


// Fetch the data from cards.json
fetch("cards.json")
  .then((response) => response.json())
  .then((data) => {
    flashcardsData = data.flashcards;
    nextButton.disabled = false;
    prevButton.disabled = false;
    randomToggle.disabled = false;
    updateCardContent();
    updateNavigationButtons();
  })
  .catch((error) => {
    console.error("Error fetching flashcards:", error);
    flashcardContentElement.textContent =
      "Erreur lors du chargement des flashcards. Veuillez réessayer.";
  });