// Array of colors for the cards
const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'];

// Duplicate the colors to create pairs
let cards = [...colors, ...colors];

// Function to shuffle the cards
function shuffleCards(cards) {
// Function to shuffle the cards
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
  
}

// Function to create the card elements and add them to the game board
function createCards(cards) {
    const gameBoard = document.getElementById('game-board');
  
    // Calculate the size of the grid based on the number of cards
    const gridSize = Math.sqrt(cards.length);
  
    // Create a new div for each row in the grid
    for (let i = 0; i < gridSize; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
  
      // Create a new card for each column in the row
      for (let j = 0; j < gridSize; j++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = cards[i * gridSize + j];
        card.dataset.index = i * gridSize + j;

         // Add a click event to the card
      card.addEventListener('click', () => flipCard(card));
  
        // Create a new div for the symbol and add it to the card
      const symbol = document.createElement('div');
      symbol.classList.add('symbol');
      symbol.textContent = cards[i * gridSize + j]; // Use the card color as the symbol for now
      card.appendChild(symbol);

      card.addEventListener('click', () => flipCard(card));

      row.appendChild(card);
    }
  
      gameBoard.appendChild(row);
    }
  }

let flippedCards = [];

// Function to handle the card flip
function flipCard(card) {
  // Add the 'flipped' class to the card
  card.classList.add('flipped');

  // Add the card to the flippedCards array
  flippedCards.push(card);

  // If two cards have been flipped, check for a match
  if (flippedCards.length === 2) {
    checkMatch(flippedCards[0], flippedCards[1]);
  }
}

// Function to check if two flipped cards match
function checkMatch(card1, card2) {
    if (card1.dataset.color === card2.dataset.color) {
      // The cards match
      card1.classList.add('match');
      card2.classList.add('match');
      // Check if all pairs of cards have been matched
    const allCards = document.querySelectorAll('.card');
    const matchedCards = document.querySelectorAll('.match');
    if (allCards.length === matchedCards.length) {
      // All pairs of cards have been matched, the player wins the game
      alert('Congratulations, you won the game!');
    }
    } else {
      // The cards do not match, flip them back over
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
      }, 1000);
    }
  
    // Clear the flippedCards array
    flippedCards = [];
  }

  let numberOfPlayers = 1;

  // Function to choose the number of players
  function chooseNumberOfPlayers() {
    const players = prompt("Enter the number of players (1 or 2):");
  
    if (players === "1" || players === "2") {
      numberOfPlayers = parseInt(players);
    } else {
      alert("Invalid number of players. Defaulting to 1 player.");
    }
  }
  
  // Function to start the game
  function startGame() {
    chooseNumberOfPlayers();
    cards = shuffleCards(cards); // Shuffle the cards
    createCards(cards);
  }
  
  // Call startGame to start the game
  startGame();