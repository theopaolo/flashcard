// import Swiper JS
import Swiper from "swiper";
import { FreeMode, Keyboard, Mousewheel } from "swiper/modules";
// import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// Oracle data and state
let oracleData = [];
let allCards = []; // Store original cards for filtering
let swiper = null;
let cardsFlipped = new Set(); // Track which cards are flipped
let currentFilter = 'all'; // Track current filter
let favorites = new Set(); // Track favorite cards
let currentView = 'swiper'; // Track current view mode: 'swiper' or 'grid'

// DOM elements (will be accessed after DOM loads)
let swiperWrapper, shuffleBtn, flipAllBtn, focusToggleBtn, sosBtn, viewToggleBtn, gridContainer, swiperContainer, sosOverlay;

// Category configuration - now handled by CSS via data-category-id attribute

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
        <div class="card-question"><h2>${formatText(card.question)}</h2></div>
        <div class="card-answer"><p>${formatText(card.reponse)}</p></div>
        <button class="favorite-btn" data-card-index="${index}" title="Marquer comme favori">
          <svg class="favorite-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
        </button>
      </div>
    </div>
  `;

  // Category styling is handled by CSS via data-category-id attribute

  // Setup favorite button (only one now, on the back)
  const favoriteButton = cardElement.querySelector('.favorite-btn');
  if (favoriteButton) {
    // Update button state based on favorites
    if (favorites.has(index)) {
      favoriteButton.classList.add('favorited');
    }

    // Add event listener for favorite toggle
    favoriteButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card flip
      toggleFavorite(index);
    });
  }

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

// Create card element for grid view
function createGridCardElement(card, index) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "oracle-card-container";

  const cardElement = document.createElement("div");
  cardElement.className = "oracle-card";
  cardElement.dataset.categoryId = card.category_id;

  // Check if card was previously flipped
  if (cardsFlipped.has(index)) {
    cardElement.classList.add("flipped");
  }

  cardElement.innerHTML = `
    <div class="card-face card-front">
      <!-- Empty front - just category color -->
    </div>
    <div class="card-face card-back">
      <div class="card-content">
        <div class="card-question"><h2>${formatText(card.question)}</h2></div>
        <div class="card-answer"><p>${formatText(card.reponse)}</p></div>
        <button class="favorite-btn" data-card-index="${index}" title="Marquer comme favori">
          <svg class="favorite-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
        </button>
      </div>
    </div>
  `;

  // Category styling is handled by CSS via data-category-id attribute

  // Setup favorite button
  const favoriteButton = cardElement.querySelector('.favorite-btn');
  if (favoriteButton) {
    if (favorites.has(index)) {
      favoriteButton.classList.add('favorited');
    }
    favoriteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(index);
    });
  }

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

  cardElement.addEventListener("click", flipCard);

  cardContainer.appendChild(cardElement);
  return cardContainer;
}

// Initialize swiper with all cards
function initializeSwiper() {
  // Clear existing slides
  if (swiperWrapper) {
    swiperWrapper.innerHTML = "";
  }
  cardsFlipped.clear();

  // Create slides for all cards (only if swiperWrapper exists)
  if (swiperWrapper) {
    oracleData.forEach((card, index) => {
      const slide = createCardElement(card, index);
      swiperWrapper.appendChild(slide);
    });
  }

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
      momentumRatio: 0.7,
      momentumVelocityRatio: 0.7,
    },

    mousewheel: {
      enabled: true,
      forceToAxis: true,
    },

    keyboard: {
      enabled: true,
      onlyInView: true,
      wport: true,
    },
    slidesPerView: "auto",
    spaceBetween: 0,
    grabCursor: true,
    centerInsufficientSlides: true,
    watchOverflow: true,

    // Mobile performance optimizations
    updateOnWindowResize: true,
    observer: false,
    observeParents: false,
    // resistance: true,
    // resistanceRatio: 0.85,
    speed: 400,
    touchRatio: 1.2,
  });
}

// Initialize grid view with all cards
function initializeGrid() {
  // Clear existing cards
  if (gridContainer) {
    gridContainer.innerHTML = "";
  }

  // Create cards for grid view
  if (gridContainer) {
    oracleData.forEach((card, index) => {
      const cardElement = createGridCardElement(card, index);
      gridContainer.appendChild(cardElement);
    });
  }
}

// Toggle between swiper and grid view
function toggleView() {
  if (currentView === 'swiper') {
    // Switch to grid view
    currentView = 'grid';
    swiperContainer.style.display = 'none';
    gridContainer.style.display = 'grid';
    if (viewToggleBtn) {
      viewToggleBtn.textContent = 'Swiper';
    }

    // Destroy swiper instance to save resources
    if (swiper) {
      swiper.destroy(false, false);
      swiper = null;
    }

    // Initialize grid
    initializeGrid();
  } else {
    // Switch to swiper view
    currentView = 'swiper';
    swiperContainer.style.display = 'flex';
    gridContainer.style.display = 'none';
    if (viewToggleBtn) {
      viewToggleBtn.textContent = 'Grille';
    }

    // Clear any loading messages first
    if (swiperWrapper) {
      swiperWrapper.innerHTML = '';
    }

    // Re-initialize swiper
    initializeSwiper();
  }

  // Save preference to localStorage
  localStorage.setItem('viewMode', currentView);
}

// Format text with simple line breaks (no HTML escaping needed for oracle cards)
function formatText(text) {
  if (!text) return "";
  return text.replace(/\n/g, "<br>");
}

// Shuffle cards array
function shuffleCards() {
  const shuffled = [...oracleData];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  oracleData = shuffled;

  // Reinitialize current view
  if (currentView === 'grid') {
    initializeGrid();
  } else {
    initializeSwiper();
  }
}

// Flip all cards
let isFlippingAll = false;

function flipAllCards() {

  if (isFlippingAll) return;
  isFlippingAll = true;
  flipAllBtn.classList.toggle('active');

  const allCards = document.querySelectorAll(".oracle-card");
  const shouldFlip = cardsFlipped.size < oracleData.length / 2; // Flip if less than half are flipped

  allCards.forEach((card, index) => {

    setTimeout(() => {
      if (shouldFlip) {
        card.classList.add("flipped");
        cardsFlipped.add(index);
      } else {
        card.classList.remove("flipped");
        cardsFlipped.delete(index);
      }

      // Re-enable button after last card animation
      if (index === allCards.length - 1) {
        setTimeout(() => {
          if (flipAllBtn) {
            flipAllBtn.style.opacity = '';
            flipAllBtn.style.pointerEvents = '';
          }
          isFlippingAll = false;
        }, 100); // Small delay after last card
      }
    },  50); // Stagger by 50ms
  });
}


// Filter cards by category
function filterCards(categoryId) {
  // If clicking the same filter that's already active, reset to all cards
  let resetToAll = false;
  if (currentFilter === categoryId) {
    categoryId = 'all';
    currentFilter = 'all';
    resetToAll = true;
  } else {
    currentFilter = categoryId;
  }

  // Update active filter in legend - clear all first
  document.querySelectorAll('.legend-filter').forEach(filter => {
    filter.classList.remove('active');
  });

  // Set active state for the selected filter (unless it's 'all')
  if (categoryId !== 'all') {
    const activeFilterElement = document.querySelector(`[data-category-id="${categoryId}"]`);
    if (activeFilterElement) {
      activeFilterElement.classList.add('active');
    }
  }

  if (categoryId === 'all') {
    oracleData = [...allCards];
  } else if (categoryId === 'favorites') {
    // Filter by favorite cards
    oracleData = allCards.filter((_, index) => favorites.has(index));
  } else {
    oracleData = allCards.filter(card => card.category_id == categoryId);
  }

  // Reinitialize current view
  if (currentView === 'grid') {
    initializeGrid();
  } else {
    initializeSwiper();
  }
}

// Focus mode functionality
function toggleFocusMode() {
  const body = document.body;
  const isCurrentlyFocused = body.classList.contains('focus-mode');

  if (isCurrentlyFocused) {
    body.classList.remove('focus-mode');
    if (focusToggleBtn) {
      focusToggleBtn.classList.remove('active');
    }
    localStorage.setItem('focusMode', 'false');
  } else {
    body.classList.add('focus-mode');
    if (focusToggleBtn) {
      focusToggleBtn.classList.add('active');
    }
    localStorage.setItem('focusMode', 'true');
  }
}

// Load focus mode preference
function loadFocusMode() {
  const savedFocusMode = localStorage.getItem('focusMode');
  if (savedFocusMode === 'true') {
    document.body.classList.add('focus-mode');
    if (focusToggleBtn) {
      focusToggleBtn.classList.add('active');
    }
  }
}

// Load view mode preference
function loadViewMode() {
  const savedViewMode = localStorage.getItem('viewMode');
  if (savedViewMode === 'grid') {
    currentView = 'grid';
    if (swiperContainer) swiperContainer.style.display = 'none';
    if (gridContainer) gridContainer.style.display = 'grid';
    if (viewToggleBtn) viewToggleBtn.textContent = 'Swiper';
  } else {
    currentView = 'swiper';
    if (swiperContainer) swiperContainer.style.display = 'flex';
    if (gridContainer) gridContainer.style.display = 'none';
    if (viewToggleBtn) viewToggleBtn.textContent = 'Grille';
  }
}

// Setup event listeners after DOM is loaded
function setupEventListeners() {
  // Get DOM elements
  swiperWrapper = document.getElementById("swiper-wrapper");
  swiperContainer = document.getElementById("cards-swiper");
  gridContainer = document.getElementById("cards-grid");
  shuffleBtn = document.getElementById("shuffle-btn");
  flipAllBtn = document.getElementById("flip-all-btn");
  focusToggleBtn = document.getElementById("focus-toggle-btn");
  sosBtn = document.getElementById("sos-btn");
  viewToggleBtn = document.getElementById("view-toggle-btn");
  sosOverlay = document.querySelector(".sos-overlay");

  // Button event listeners with null checks
  if (viewToggleBtn) {
    viewToggleBtn.addEventListener("click", (e) => {
      if (document.body.classList.contains('sos-active')) {
        exitSOSMode();
        setTimeout(() => toggleView(), 100);
        return;
      }
      toggleView();
    });
  }
  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", (e) => {
      if (document.body.classList.contains('sos-active')) {
        exitSOSMode();
        setTimeout(() => shuffleCards(), 100);
        return;
      }
      shuffleCards();
    });
  }
  if (flipAllBtn) {
    flipAllBtn.addEventListener("click", (e) => {
      if (document.body.classList.contains('sos-active')) {
        exitSOSMode();
        setTimeout(() => flipAllCards(), 100);
        return;
      }
      flipAllCards();
    });
  }
  if (focusToggleBtn) {
    focusToggleBtn.addEventListener("click", (e) => {
      if (document.body.classList.contains('sos-active')) {
        exitSOSMode();
        setTimeout(() => toggleFocusMode(), 100);
        return;
      }
      toggleFocusMode();
    });
  }
  if (sosBtn) {
    sosBtn.addEventListener("click", () => {
      if (document.body.classList.contains('sos-active')) {
        exitSOSMode();
      } else {
        triggerSOSMode();
      }
    });
  }

  // Legend filter event listeners
  document.querySelectorAll('.legend-filter').forEach(filter => {
    filter.addEventListener('click', (event) => {
      const categoryId = event.currentTarget.dataset.categoryId;

      // Exit SOS mode first if active, then apply filter
      if (document.body.classList.contains('sos-active')) {
        exitSOSMode();
        setTimeout(() => filterCards(categoryId), 100);
        return;
      }

      filterCards(categoryId);
    });
  });

  // No initial active filter since we removed "all" option

  // Keyboard shortcuts
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      flipAllCards();
    } else if (event.code === "KeyS") {
      event.preventDefault();
      shuffleCards();
    } else if (event.code === "KeyF") {
      event.preventDefault();
      toggleFocusMode();
    } else if (event.code === "Escape") {
      event.preventDefault();
      if (document.body.classList.contains('sos-active')) {
        exitSOSMode();
      } else {
        triggerSOSMode();
      }
    }
  });

  // Load preferences
  loadFocusMode();
  loadViewMode();
}

// Favorites functionality
function toggleFavorite(cardIndex) {
  if (favorites.has(cardIndex)) {
    favorites.delete(cardIndex);
  } else {
    favorites.add(cardIndex);
  }

  // Save to localStorage
  saveFavorites();

  // Update UI for all cards with this index
  updateFavoriteButtons(cardIndex);
}

function updateFavoriteButtons(cardIndex) {
  const buttons = document.querySelectorAll(`[data-card-index="${cardIndex}"]`);
  const isFavorited = favorites.has(cardIndex);

  buttons.forEach(btn => {
    if (isFavorited) {
      btn.classList.add('favorited');
    } else {
      btn.classList.remove('favorited');
    }
  });
}

function saveFavorites() {
  localStorage.setItem('cardFavorites', JSON.stringify([...favorites]));
}

function loadFavorites() {
  const saved = localStorage.getItem('cardFavorites');
  if (saved) {
    favorites = new Set(JSON.parse(saved));
  }
}

// SOS Mode - Emergency card selection
function triggerSOSMode() {
  // SOS card categories prioritization (most helpful for crisis)
  const sosCategories = [
    8,  // Mantras et Rappels
    11, // Gestion anxiété/stress TDAH
    9,  // Soins TDAH
    3,  // Apaisement/Transition
    7   // Conseils TDAH
  ];

  // Get emergency cards
  const sosCards = [];

  for (const categoryId of sosCategories) {
    const categoryCards = allCards.filter(card => card.category_id === categoryId);
    if (categoryCards.length > 0) {
      // Take 1-2 cards from each priority category
      const selectedFromCategory = categoryCards.sort(() => 0.5 - Math.random()).slice(0, 2);
      sosCards.push(...selectedFromCategory);

      // Stop when we have 3 cards max
      if (sosCards.length >= 3) {
        break;
      }
    }
  }

  // Ensure we have exactly 3 cards or less
  const finalSOSCards = sosCards.slice(0, 3);

  if (finalSOSCards.length === 0) {
    // Fallback if no SOS cards available
    console.warn('No SOS cards available');
    return;
  }

  // Update display
  currentFilter = 'sos';
  oracleData = finalSOSCards;

  // Clear active filters in legend
  document.querySelectorAll('.legend-filter').forEach(filter => {
    filter.classList.remove('active');
  });

  // Activate SOS mode visually
  document.body.classList.add('sos-active');

  // Show overlay and add click listener
  if (sosOverlay) {
    sosOverlay.style.display = 'block';
    sosOverlay.addEventListener('click', exitSOSMode);
  }

  // Reinitialize current view with SOS cards
  if (currentView === 'grid') {
    initializeGrid();
  } else {
    initializeSwiper();
  }

  // Optional: Auto-flip cards to show content immediately
  setTimeout(() => {
    const allCards = document.querySelectorAll('.oracle-card');
    allCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('flipped');
        cardsFlipped.add(index);
      }, index * 200); // Stagger the flipping
    });
  }, 500);
}

// Exit SOS mode
function exitSOSMode() {
  document.body.classList.remove('sos-active');
  currentFilter = 'all';

  // Hide overlay and remove click listener
  if (sosOverlay) {
    sosOverlay.style.display = 'none';
    sosOverlay.removeEventListener('click', exitSOSMode);
  }

  // Clear flipped cards state
  cardsFlipped.clear();

  // Return to all cards
  oracleData = [...allCards];

  // Reset active filter in legend
  document.querySelectorAll('.legend-filter').forEach(filter => {
    filter.classList.remove('active');
  });

  // Reinitialize current view
  if (currentView === 'grid') {
    initializeGrid();
  } else {
    initializeSwiper();
  }
}

// Load oracle data
function loadOracleData() {
  console.log("Loading oracle data...");

  // Show loading state only if in swiper view
  if (swiperWrapper && currentView === 'swiper') {
    swiperWrapper.innerHTML =
      '<div class="loading-message">Chargement de l\'oracle en cours...</div>';
  }

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

      allCards = data.flashcards; // Store all cards
      oracleData = [...allCards]; // Initialize with all cards
      console.log("Oracle loaded, cards:", oracleData.length);

      // Load favorites before initializing view
      loadFavorites();

      // Initialize the current view (based on loaded preference)
      if (currentView === 'grid') {
        initializeGrid();
      } else {
        initializeSwiper();
      }
    })
    .catch((error) => {
      console.error("Error loading oracle:", error);
      if (swiperWrapper) {
        swiperWrapper.innerHTML = `<div class="error-message">Erreur lors du chargement: ${error.message}. Veuillez réessayer.</div>`;
      }
    });
}

// Initialize oracle on page load
window.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadOracleData();
});
