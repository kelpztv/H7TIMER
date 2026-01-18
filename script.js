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
  { name: "Venatus", interval: 10, img: "venatus.jpg" },
  { name: "Viorent", interval: 10, img: "viorent.jpg" },
  { name: "Ego", interval: 21, img: "ego.jpg" },

  { name: "Clemantis", fixed: ["Mon 13:30", "Thu 21:00"], img: "clemantis.jpg" },
  { name: "Livera", interval: 24, img: "livera.jpg" },
  { name: "Araneo", interval: 24, img: "araneo.jpg" },
  { name: "Undomiel", interval: 24, img: "undomiel.jpg" },

  { name: "Saphirus", fixed: ["Sun 19:00", "Tue 13:30"], img: "saphirus.jpg" },
  { name: "Lady Dalia", interval: 18, img: "ladydalia.jpg" },

  { name: "General Aquleus", interval: 29, img: "generalaquleus.jpg" },
  { name: "Thymele", fixed: ["Mon 21:00", "Wed 13:30"], img: "thymele.jpg" },

  { name: "Amentis", interval: 29, img: "amentis.jpg" },
  { name: "Baron Braudmore", interval: 32, img: "baronbraudmore.jpg" },
  { name: "Milavy", fixed: ["Sat 17:00"], img: "milavy.jpg" },

  { name: "Metus", interval: 48, img: "metus.jpg" },
  { name: "Duplican", interval: 48, img: "duplican.jpg" },

  { name: "Shuliar", interval: 35, img: "shuliar.jpg" },
  { name: "Ringor", fixed: ["Sat 19:00"], img: "ringor.jpg" },
  { name: "Roderick", fixed: ["Fri 21:00"], img: "roderick.jpg" },

  { name: "Gareth", interval: 32, img: "gareth.jpg" },
  { name: "Titore", interval: 37, img: "titore.jpg" },
  { name: "Larba", interval: 35, img: "larba.jpg" },

  { name: "Catena", interval: 35, img: "catena.jpg" },
  { name: "Auraq", fixed: ["Fri 00:00", "Wed 23:00"], img: "auraq.jpg" },

  { name: "Secreta", interval: 62, img: "secreta.jpg" },
  { name: "Ordo", interval: 62, img: "ordo.jpg" },
  { name: "Asta", interval: 62, img: "asta.jpg" },
  { name: "Supore", interval: 62, img: "supore.jpg" },

  { name: "Chaiflock", fixed: ["Sat 00:00"], img: "chaiflock.jpg" },
  { name: "Benji", fixed: ["Sun 23:00"], img: "benji.jpg" },

  { name: "Icaruthia", fixed: ["Tue 23:00", "Fri 23:00"], img: "icaruthia.jpg" },
  { name: "Motti", fixed: ["Wed 21:00", "Sat 21:00"], img: "motti.jpg" },
  { name: "Nevaeh", fixed: ["Sun 00:00"], img: "nevaeh.jpg" }
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
      <img src="assets/images/${boss.img}" onerror="this.src='https://via.placeholder.com/64'">
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
