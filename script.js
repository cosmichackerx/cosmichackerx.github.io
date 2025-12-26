
/* ========== PRELOADER ========== */
const preloader = document.getElementById("preloader");
const loadingText = document.getElementById("loadingPercent");

let progress = 0;
const loader = setInterval(() => {
  progress += Math.floor(Math.random() * 7) + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loader);
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";
    }, 600);
  }
  loadingText.textContent = progress + "%";
}, 120);

/* ========== SMOOTH SCROLL ========== */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* ========== MATRIX RAIN ========== */
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "01XTERMINAL@$#";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#22d3ee";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(drawMatrix, 50);

/* ========== TERMINAL TYPING ========== */
const terminal = document.getElementById("terminal");
const lines = [
  "> Initializing xTerminal...",
  "> Loading security modules...",
  "> Connecting to toolchain...",
  "> Access granted.",
  "> Welcome, Operator."
];

let lineIndex = 0;
let charIndex = 0;

function typeTerminal() {
  if (lineIndex >= lines.length) return;
  if (charIndex < lines[lineIndex].length) {
    terminal.textContent += lines[lineIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeTerminal, 50);
  } else {
    terminal.textContent += "\n";
    lineIndex++;
    charIndex = 0;
    setTimeout(typeTerminal, 600);
  }
}
setTimeout(typeTerminal, 800);

/* ========== WINDOW RESIZE ========== */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
