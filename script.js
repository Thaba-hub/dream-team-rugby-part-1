// Dummy players grouped by tournament
const players = {
  "Six Nations": [
    { id: 1, name: "Owen Farrell", team: "England", position: "Fly-half" },
    { id: 2, name: "Antoine Dupont", team: "France", position: "Scrum-half" },
    { id: 3, name: "Johnny Sexton", team: "Ireland", position: "Fly-half" },
    { id: 4, name: "Stuart Hogg", team: "Scotland", position: "Fullback" },
    { id: 5, name: "Alun Wyn Jones", team: "Wales", position: "Lock" }
  ],
  "Rugby Championship": [
    { id: 6, name: "Beauden Barrett", team: "New Zealand", position: "Fullback" },
    { id: 7, name: "Michael Hooper", team: "Australia", position: "Flanker" },
    { id: 8, name: "Cheslin Kolbe", team: "South Africa", position: "Wing" },
    { id: 9, name: "Santiago Cordero", team: "Argentina", position: "Wing" },
    { id: 10, name: "Pone Fa'amausili", team: "Australia", position: "Prop" }
  ]
};

const maxPlayers = 15;
const selectedPlayers = new Map(); // Use Map to store selected players keyed by id

const sixNationsList = document.getElementById("six-nations-players");
const rugbyChampList = document.getElementById("rugby-championship-players");
const selectedList = document.getElementById("selected-players");
const totalSelectedSpan = document.getElementById("total-selected");

// Render player lists
function renderPlayers() {
  players["Six Nations"].forEach(player => {
    const li = createPlayerListItem(player);
    sixNationsList.appendChild(li);
  });
  players["Rugby Championship"].forEach(player => {
    const li = createPlayerListItem(player);
    rugbyChampList.appendChild(li);
  });
}

function createPlayerListItem(player) {
  const li = document.createElement("li");
  li.textContent = `${player.name} (${player.team}, ${player.position})`;
  li.dataset.id = player.id;

  li.addEventListener("click", () => {
    togglePlayerSelection(player);
  });

  return li;
}

function togglePlayerSelection(player) {
  if (selectedPlayers.has(player.id)) {
    // Remove player
    selectedPlayers.delete(player.id);
  } else {
    // Add player only if not exceeding max
    if (selectedPlayers.size < maxPlayers) {
      selectedPlayers.set(player.id, player);
    } else {
      alert(`You can only select up to ${maxPlayers} players.`);
      return;
    }
  }
  updateSelectedList();
  updatePlayerListsUI();
}

function updateSelectedList() {
  selectedList.innerHTML = "";
  selectedPlayers.forEach(player => {
    const li = document.createElement("li");
    li.textContent = `${player.name} (${player.team}, ${player.position})`;
    selectedList.appendChild(li);
  });
  totalSelectedSpan.textContent = selectedPlayers.size;
}

function updatePlayerListsUI() {
  // Clear lists
  sixNationsList.querySelectorAll("li").forEach(li => li.classList.remove("selected"));
  rugbyChampList.querySelectorAll("li").forEach(li => li.classList.remove("selected"));

  // Highlight selected players
  selectedPlayers.forEach(player => {
    const selector = `li[data-id="${player.id}"]`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.classList.add("selected");
    }
  });
}

// Initial render
renderPlayers();
