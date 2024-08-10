let playerData = [];
let selectedPlayerName = null; // Variable zum Speichern des playerName der ausgewählten Karte

// Fetch data and populate cards
fetch("https://opensource.aoe.com/the-card-game-data/player.json")
  .then(response => response.json())
  .then(data => {
    playerData = data;
    populateCards(playerData);
  })
  .catch(error => console.error('Error fetching player data:', error));


// Populate cards with player information
function populateCards(players) {
  const cardOverview = document.getElementById('cardOverview');
  cardOverview.innerHTML = ''; // Clear existing content

  players.forEach((player, index) => {
    const card = document.createElement('div');
    card.classList.add('card', 'bg-dark', 'text-white', 'mb-2');
    card.setAttribute('data-player-name', player.playerName); // Use playerName as unique identifier
    card.innerHTML = `
      <p class="card-text">${player.realName}</p>
      <p class="card-text">${player.playerName}</p>
      <p class="card-text">${player.asset}</p>
    `;
    card.addEventListener('click', () => selectCard(player.playerName)); // Use playerName to identify the card
    cardOverview.appendChild(card);
  });

  // If there is a selected card, update the selection after repopulating cards
  if (selectedPlayerName) {
    selectCard(selectedPlayerName);
  }
}

// Handle card selection
function selectCard(playerName) {
  // Deselect all cards
  document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));

  // Select the clicked card
  const selectedCard = document.querySelector(`.card[data-player-name="${playerName}"]`);
  if (selectedCard) {
    selectedCard.classList.add('selected');
  }

  // Get the player data from the globally stored data
  const player = playerData.find(p => p.playerName === playerName);

  // Update the details view with the full content
  const detailsText = document.getElementById('detailsText');
  detailsText.innerHTML = `
    <strong>Real Name:</strong> ${player.realName}<br>
    <strong>Player Name:</strong> ${player.playerName}<br>
    <strong>Asset:</strong> ${player.asset}
  `;

  // Make the details view visible
  const detailsView = document.getElementById('detailsView');
  detailsView.style.visibility = 'visible';

  // Store the selected player's name
  selectedPlayerName = playerName;
}

// Sort players in ascending order by real name
function sortPlayersAsc() {
  const sortedPlayers = [...playerData].sort((a, b) => a.realName.localeCompare(b.realName));
  populateCards(sortedPlayers);
}

// Sort players in descending order by real name
function sortPlayersDesc() {
  const sortedPlayers = [...playerData].sort((a, b) => b.realName.localeCompare(a.realName));
  populateCards(sortedPlayers);
}

// Add event listeners for sorting buttons
document.getElementById('sortAsc').addEventListener('click', sortPlayersAsc);
document.getElementById('sortDesc').addEventListener('click', sortPlayersDesc);
