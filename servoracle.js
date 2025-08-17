// Oracle data and state
let oracleData = [];
let currentMainCard = null;
let currentJokerCard = null;
let mainCardFlipped = false;
let jokerCardFlipped = false;

// DOM elements
const mainCard = document.getElementById("main-card");
const jokerCard = document.getElementById("joker-card");
const jokerNavigation = document.getElementById("joker-navigation");
const mainQuestion = document.getElementById("main-question");
const mainAnswer = document.getElementById("main-answer");
const jokerQuestion = document.getElementById("joker-question");
const jokerAnswer = document.getElementById("joker-answer");
const mainFlipBtn = document.getElementById("main-flip-btn");
const jokerFlipBtn = document.getElementById("joker-flip-btn");
const refreshMainBtn = document.getElementById("refresh-main-btn");
const drawJokerBtn = document.getElementById("draw-joker-btn");
const closeJokerBtn = document.getElementById("close-joker-btn");

// Category configuration with colors (simplified)
const CATEGORIES = {
  1: { color: "#FFE4B5", textColor: "#8B4513" }, // Matin
  2: { color: "#E6F3FF", textColor: "#1E3A8A" }, // Journée
  3: { color: "#E6E6FA", textColor: "#4B0082" }, // Soirée
  5: { color: "#FFE4E1", textColor: "#DC143C" }  // Joker
};

// Get category ID based on current hour
function getCurrentCategoryId() {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour <= 11) {
    return 1; // Matin
  } else if (currentHour >= 12 && currentHour <= 17) {
    return 2; // Journée
  } else {
    return 3; // Soirée
  }
}

// Get consistent card based on hour (same card per hour)
function getCardBasedOnHour() {
  const currentHour = new Date().getHours();
  const targetCategoryId = getCurrentCategoryId();
  const categoryCards = oracleData.filter(card => card.category_id === targetCategoryId);

  if (categoryCards.length === 0) {
    console.error(`No cards found for category_id: ${targetCategoryId}`);
    return null;
  }

  // Use hour as seed for consistent selection throughout the hour
  const hourSeed = currentHour + new Date().getDate(); // Changes daily
  const cardIndex = hourSeed % categoryCards.length;

  return categoryCards[cardIndex];
}

// Get random joker card
function getRandomJokerCard() {
  const jokerCards = oracleData.filter(card => card.category_id === 5); // Joker category_id is 5
  if (jokerCards.length === 0) return null;

  return jokerCards[Math.floor(Math.random() * jokerCards.length)];
}

// Format text with simple line breaks (no HTML escaping needed for oracle cards)
function formatText(text) {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

// Apply category styling to card
function applyCategoryStyle(cardElement, categoryId) {
  const categoryConfig = CATEGORIES[categoryId];
  if (!categoryConfig) return;

  cardElement.style.backgroundColor = categoryConfig.color;
  cardElement.style.color = categoryConfig.textColor;
  cardElement.style.borderLeft = `5px solid ${categoryConfig.textColor}`;
}

// Display main card
function displayMainCard(card) {
  currentMainCard = card;
  mainCardFlipped = false;

  // Apply category styling
  applyCategoryStyle(mainCard, card.category_id);

  // Set content
  mainQuestion.innerHTML = formatText(card.question);
  mainAnswer.innerHTML = formatText(card.reponse);

  // Reset display state
  mainQuestion.style.display = 'block';
  mainAnswer.style.display = 'none';
  mainFlipBtn.textContent = '🔄 Retourner';
}

// Display joker card
function displayJokerCard(card) {
  currentJokerCard = card;
  jokerCardFlipped = false;

  // Apply category styling
  applyCategoryStyle(jokerCard, card.category_id);

  // Set content
  jokerQuestion.innerHTML = formatText(card.question);
  jokerAnswer.innerHTML = formatText(card.reponse);

  // Reset display state
  jokerQuestion.style.display = 'block';
  jokerAnswer.style.display = 'none';
  jokerFlipBtn.textContent = '🔄 Retourner';

  // Show joker card and navigation
  jokerCard.style.display = 'block';
  jokerNavigation.style.display = 'block';
}



// Event handlers for card flipping
function flipMainCard() {
  if (!currentMainCard) return;

  mainCardFlipped = !mainCardFlipped;

  if (mainCardFlipped) {
    mainQuestion.style.display = 'none';
    mainAnswer.style.display = 'block';
    mainFlipBtn.textContent = '🔄 Retourner';
  } else {
    mainQuestion.style.display = 'block';
    mainAnswer.style.display = 'none';
    mainFlipBtn.textContent = '🔄 Retourner';
  }
}

function flipJokerCard() {
  if (!currentJokerCard) return;

  jokerCardFlipped = !jokerCardFlipped;

  if (jokerCardFlipped) {
    jokerQuestion.style.display = 'none';
    jokerAnswer.style.display = 'block';
    jokerFlipBtn.textContent = '🔄 Retourner';
  } else {
    jokerQuestion.style.display = 'block';
    jokerAnswer.style.display = 'none';
    jokerFlipBtn.textContent = '🔄 Retourner';
  }
}

// Get random card from current time period
function getRandomCardFromCurrentPeriod() {
  const targetCategoryId = getCurrentCategoryId();
  const categoryCards = oracleData.filter(card => card.category_id === targetCategoryId);

  if (categoryCards.length === 0) {
    console.error(`No cards found for category_id: ${targetCategoryId}`);
    return null;
  }

  return categoryCards[Math.floor(Math.random() * categoryCards.length)];
}

// Draw new main card
function drawNewMainCard() {
  const card = getRandomCardFromCurrentPeriod();
  if (card) {
    displayMainCard(card);
  } else {
    // Show error message if no cards available for current time
    mainQuestion.textContent = "Aucune carte disponible pour cette période de la journée.";
    mainAnswer.style.display = 'none';
    mainQuestion.style.display = 'block';
  }
}

// Draw joker card
function drawJokerCard() {
  const jokerCard = getRandomJokerCard();
  if (jokerCard) {
    displayJokerCard(jokerCard);
  }
}

// Close joker card
function closeJokerCard() {
  jokerCard.style.display = 'none';
  jokerNavigation.style.display = 'none';
  currentJokerCard = null;
  jokerCardFlipped = false;
}

// Event listeners
mainFlipBtn.addEventListener("click", flipMainCard);
jokerFlipBtn.addEventListener("click", flipJokerCard);
refreshMainBtn.addEventListener("click", drawNewMainCard);
drawJokerBtn.addEventListener("click", drawJokerCard);
closeJokerBtn.addEventListener("click", closeJokerCard);

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    flipMainCard();
  } else if (event.code === "KeyJ") {
    event.preventDefault();
    drawJokerCard();
  } else if (event.code === "KeyR") {
    event.preventDefault();
    drawNewMainCard();
  } else if (event.code === "Escape") {
    event.preventDefault();
    closeJokerCard();
  }
});

// Load oracle data
function loadOracleData() {
  console.log('Loading oracle data...');

  // Show loading state
  mainQuestion.textContent = "Chargement de l'oracle en cours...";

  fetch('decks/deck-brain-pings.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Validate data structure
      if (!data.flashcards || !Array.isArray(data.flashcards) || data.flashcards.length === 0) {
        throw new Error('Invalid oracle format or empty oracle');
      }

      oracleData = data.flashcards;
      console.log('Oracle loaded, cards:', oracleData.length);

      // Draw initial card based on current time
      drawNewMainCard();
    })
    .catch((error) => {
      console.error("Error loading oracle:", error);
      mainQuestion.textContent = `Erreur lors du chargement: ${error.message}. Veuillez réessayer.`;
    });
}

// Initialize oracle on page load
window.addEventListener('DOMContentLoaded', () => {
  loadOracleData();
});