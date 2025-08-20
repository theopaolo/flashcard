// import Swiper JS
import Swiper from "swiper";
import { FreeMode, Keyboard, Mousewheel } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// Oracle data and state
let oracleData = [];
let swiper = null;
let cardsFlipped = new Set(); // Track which cards are flipped

// DOM elements (will be accessed after DOM loads)
let swiperWrapper, shuffleBtn, flipAllBtn;

// Category configuration with colors and gradients
const CATEGORIES = {
  1: {
    color: "linear-gradient(135deg, #FFE4B5 0%, #F5DEB3 100%)",
    textColor: "#8B4513",
  }, // Matin
  2: {
    color: "linear-gradient(135deg, #E6F3FF 0%, #DBEAFE 100%)",
    textColor: "#1E3A8A",
  }, // Journée
  3: {
    color: "linear-gradient(135deg, #E6E6FA 0%, #DDD6FE 100%)",
    textColor: "#4B0082",
  }, // Soirée
  5: {
    color: "linear-gradient(135deg, #FFE4E1 0%, #FECACA 100%)",
    textColor: "#DC143C",
  }, // Joker
};

// Create card element for swiper
function createCardElement(card, index) {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.dataset.cardIndex = index;

  const cardContainer = document.createElement("div");
  cardContainer.className = "oracle-card-container";

  const cardElement = document.createElement("div");
  cardElement.className = "oracle-card";
  cardElement.dataset.categoryId = card.category_id;

  cardElement.innerHTML = `
    <div class="card-face card-front">
      <!-- Empty front - just category color -->
    </div>
    <div class="card-face card-back">
      <div class="card-content">
        <div class="card-question">${formatText(card.question)}</div>
        <div class="card-answer">${formatText(card.reponse)}</div>
      </div>
    </div>
  `;

  // Apply category styling only to front face
  const cardFront = cardElement.querySelector(".card-front");
  applyCategoryStyle(cardFront, card.category_id);

  // Simple CSS-only flip on click
  const flipCard = () => {
    const isFlipped = cardsFlipped.has(index);

    if (isFlipped) {
      cardElement.classList.remove("flipped");
      cardsFlipped.delete(index);
    } else {
      cardElement.classList.add("flipped");
      cardsFlipped.add(index);
    }
  };

  // Single event listener on the entire card
  cardElement.addEventListener("click", flipCard);

  cardContainer.appendChild(cardElement);
  slide.appendChild(cardContainer);
  return slide;
}

// Initialize swiper with all cards
function initializeSwiper() {
  // Clear existing slides
  swiperWrapper.innerHTML = "";
  cardsFlipped.clear();

  // Create slides for all cards
  oracleData.forEach((card, index) => {
    const slide = createCardElement(card, index);
    swiperWrapper.appendChild(slide);
  });

  // Initialize or update swiper
  if (swiper) {
    swiper.destroy(true, true);
  }

  swiper = new Swiper("#cards-swiper", {
    modules: [FreeMode, Mousewheel, Keyboard],
    direction: "horizontal",
    freeMode: {
      enabled: true,
      momentum: true,
      momentumRatio: 0.5,
      momentumVelocityRatio: 0.5,
    },
    mousewheel: {
      enabled: true,
      forceToAxis: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    slidesPerView: "auto",
    spaceBetween: 0, // Space handled by slide padding
    grabCursor: true,
    centerInsufficientSlides: true,
    watchOverflow: true,
  });
}

// Format text with simple line breaks (no HTML escaping needed for oracle cards)
function formatText(text) {
  if (!text) return "";
  return text.replace(/\n/g, "<br>");
}

// Apply category styling to card
function applyCategoryStyle(cardElement, categoryId) {
  const categoryConfig = CATEGORIES[categoryId];
  if (!categoryConfig) return;

  cardElement.style.background = categoryConfig.color;
  cardElement.style.color = categoryConfig.textColor;
}

// Shuffle cards array
function shuffleCards() {
  const shuffled = [...oracleData];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  oracleData = shuffled;
  initializeSwiper();
}

// Flip all cards
function flipAllCards() {
  const allCards = document.querySelectorAll(".oracle-card");
  const shouldFlip = cardsFlipped.size < oracleData.length / 2; // Flip if less than half are flipped

  allCards.forEach((card, index) => {
    // Add staggered delay for visual effect
    setTimeout(() => {
      if (shouldFlip) {
        card.classList.add("flipped");
        cardsFlipped.add(index);
      } else {
        card.classList.remove("flipped");
        cardsFlipped.delete(index);
      }
    }, index * 50); // Stagger by 50ms
  });
}

// Removed resetCards function - flipAllCards handles this intelligently

// Setup event listeners after DOM is loaded
function setupEventListeners() {
  // Get DOM elements
  swiperWrapper = document.getElementById("swiper-wrapper");
  shuffleBtn = document.getElementById("shuffle-btn");
  flipAllBtn = document.getElementById("flip-all-btn");

  // Button event listeners
  shuffleBtn.addEventListener("click", shuffleCards);
  flipAllBtn.addEventListener("click", flipAllCards);

  // Keyboard shortcuts
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      flipAllCards();
    } else if (event.code === "KeyS") {
      event.preventDefault();
      shuffleCards();
    }
  });
}

// Load oracle data
function loadOracleData() {
  console.log("Loading oracle data...");

  // Show loading state
  swiperWrapper.innerHTML =
    '<div class="loading-message">Chargement de l\'oracle en cours...</div>';

  fetch("decks/deck-brain-pings.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Validate data structure
      if (
        !data.flashcards ||
        !Array.isArray(data.flashcards) ||
        data.flashcards.length === 0
      ) {
        throw new Error("Invalid oracle format or empty oracle");
      }

      oracleData = data.flashcards;
      console.log("Oracle loaded, cards:", oracleData.length);

      // Initialize swiper with all cards
      initializeSwiper();
    })
    .catch((error) => {
      console.error("Error loading oracle:", error);
      swiperWrapper.innerHTML = `<div class="error-message">Erreur lors du chargement: ${error.message}. Veuillez réessayer.</div>`;
    });
}

// Initialize oracle on page load
window.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadOracleData();
});
