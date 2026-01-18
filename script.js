// ================================
// H7 Alliance Boss Spawn Timer
// Timezone: Asia/Manila (UTC+8)
// Admin Password: H7bossings
// ================================

const ADMIN_PASSWORD = "H7bossings";
let isAdmin = false;

// ---------- Time Helpers ----------
const nowPH = () =>
  new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })
  );

const formatTime = (ms) => {
  if (ms <= 0) return "SPAWNING";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${m}m ${sec}s`;
};

// ---------- Admin Login ----------
window.loginAdmin = () => {
  const pw = prompt("Enter admin password:");
  if (pw === ADMIN_PASSWORD) {
    isAdmin = true;
    alert("Admin mode enabled");
    render();
  } else {
    alert("Wrong password");
  }
};

// ---------- Boss Data ----------
const bosses = [
  { name: "Venatus", interval: 10 },
  { name: "Viorent", interval: 10 },
  { name: "Ego", interval: 21 },
  { name: "Livera", interval: 24 },
  { name: "Araneo", interval: 24 },
  { name: "Undomiel", interval: 24 },
  { name: "Lady Dalia", interval: 18 },
  { name: "General Aquleus", interval: 29 },
  { name: "Amentis", interval: 29 },
  { name: "Baron Braudmore", interval: 32 },
  { name: "Shuliar", interval: 35 },
  { name: "Larba", interval: 35 },
  { name: "Catena", interval: 35 },
  { name: "Gareth", interval: 32 },
  { name: "Titore", interval: 37 },
  { name: "Secreta", interval: 62 },
  { name: "Ordo", interval: 62 },
  { name: "Asta", interval: 62 },
  { name: "Supore", interval: 62 },
];

// ---------- Storage ----------
const loadTime = (name) =>
  localStorage.getItem(name)
    ? new Date(localStorage.getItem(name))
    : null;

const saveTime = (name, time) =>
  localStorage.setItem(name, time.toISOString());

// ---------- Render ----------
function render() {
  const container = document.getElementById("boss-list");
  container.innerHTML = "";

  bosses.forEach((boss) => {
    let nextSpawn = loadTime(boss.name);

    if (!nextSpawn && boss.interval) {
      nextSpawn = new Date(nowPH().getTime() + boss.interval * 3600000);
      saveTime(boss.name, nextSpawn);
    }

    const diff = nextSpawn - nowPH();

    const row = document.createElement("div");
    row.className = "boss";
    if (diff > 0 && diff < 5 * 60 * 1000) row.classList.add("soon");

    row.innerHTML = `
      <img src="assets/images/${boss.name.toLowerCase().replace(/ /g,'')}.jpg"
           onerror="this.src='https://via.placeholder.com/64'">
      <div>
        <div class="boss-name">${boss.name}</div>
      </div>
      <div class="boss-timer">${formatTime(diff)}</div>
    `;

    if (isAdmin && boss.interval) {
      const btn = document.createElement("button");
      btn.textContent = "Reset";
      btn.style.marginLeft = "12px";
      btn.onclick = () => {
        const t = new Date(nowPH().getTime() + boss.interval * 3600000);
        saveTime(boss.name, t);
        render();
      };
      row.appendChild(btn);
    }

    container.appendChild(row);
  });
}

// ---------- Live Update ----------
setInterval(render, 1000);
render();
