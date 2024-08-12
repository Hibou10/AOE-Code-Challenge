let playerData = [];
let selectedPlayerName = null; 

// Fetch data 
fetch("https://opensource.aoe.com/the-card-game-data/player.json")
  .then(response => response.json())
  .then(data => {
    playerData = data;
    populateCards(playerData);
  })
  .catch(error => console.error('Error fetching player data:', error));


// Karten mit Spielerinformationen füllen
function populateCards(players) {
  const cardOverview = document.getElementById('cardOverview');
  cardOverview.innerHTML = ''; 

  players.forEach((player, index) => {
    const card = document.createElement('div');
    card.classList.add('card', 'bg-dark', 'text-white', 'mb-2');
    card.setAttribute('data-player-name', player.playerName); 
    card.innerHTML = `
      <p class="card-text">${player.realName}</p>
      <p class="card-text">${player.playerName}</p>
      <p class="card-text">${player.asset}</p>
    `;
    card.addEventListener('click', () => selectCard(player.playerName)); 
    cardOverview.appendChild(card);
  });

  
  if (selectedPlayerName) {
    selectCard(selectedPlayerName);
  }
}

function selectCard(playerName) {
  // If the clicked card is already selected, deselect it and clear details
  if (selectedPlayerName === playerName) {
    document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));
    document.getElementById('detailsView').style.visibility = 'hidden';
    selectedPlayerName = null; // Clear the selected player
    return; 
  }

  // Deselect all cards
  document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));

  // Select the clicked card
  const selectedCard = document.querySelector(`.card[data-player-name="${playerName}"]`);
  if (selectedCard) {
    selectedCard.classList.add('selected');
  }

  // Get the player data from the stored data
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
