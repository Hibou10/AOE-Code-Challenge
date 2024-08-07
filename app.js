let playerData = [];

// Fetch data and populate cards
fetch("https://opensource.aoe.com/the-card-game-data/player.json")
  .then((response) => response.json())
  .then(data => {
    playerData = data;
    populateCards(playerData);
  })
  .catch(error => console.error('Error fetching player data:', error));

// Kartenübersicht mit den Spielerinformationen zu füllen
function populateCards(players) {
  const cardOverview = document.getElementById('cardOverview');
  cardOverview.innerHTML = ''; // Clear existing content

  players.forEach((player, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('onclick', `selectCard(${index})`);
    card.innerHTML = `
      <p class="card-text">${player.realName}</p>
      <p class="card-text">${player.playerName}</p>
      <p class="card-text">${player.asset}</p>
    `;
    cardOverview.appendChild(card);
  });
}

function selectCard(cardId) {
  // Deselect all cards
  document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));

  // Select the clicked card
  const selectedCard = document.querySelector('.card:nth-child(' + (cardId + 1) + ')');
  selectedCard.classList.add('selected');

  // Get the player data from the globally stored data
  const player = playerData[cardId];

  // Update the details view with the full content
  const detailsText = document.getElementById('detailsText');
  detailsText.innerHTML = `
    ${player.realName}<br>
    ${player.playerName}<br>
    ${player.asset}`;

  // Make the details view visible
  const detailsView = document.getElementById('detailsView');
  detailsView.style.visibility = 'visible';
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

document.getElementById('sortAsc').addEventListener('click', sortPlayersAsc);
document.getElementById('sortDesc').addEventListener('click', sortPlayersDesc);
