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
      // Start animations only after loading is done
      startMatrixAnimation(); 
      setTimeout(typeTerminal, 200); 
    }, 600);
  }
  loadingText.textContent = progress + "%";
}, 120);

/* ========== SMOOTH SCROLL ========== */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* ========== MATRIX RAIN (OPTIMIZED) ========== */
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

// Configuration
const fontSize = 14;
const chars = "01XTERMINAL@$#";
let columns;
let drops;

function initMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  columns = Math.floor(canvas.width / fontSize);
  // Reset drops only if the size changed significantly or first run
  drops = Array(columns).fill(1);
}

// Draw a single frame of the matrix
function drawMatrix() {
  // Fade effect (trail)
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // CHANGED: Neon green to match the Hacker Vibe blueprint images
  ctx.fillStyle = "#00ff41"; 
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset drop to top randomly
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

// Animation Loop Control
let lastTime = 0;
const fps = 20; // Matches your original speed (1000ms / 50ms = 20fps)
const interval = 1000 / fps;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  
  if (deltaTime > interval) {
    drawMatrix();
    lastTime = timeStamp - (deltaTime % interval);
  }
  requestAnimationFrame(animate);
}

function startMatrixAnimation() {
  initMatrix();
  requestAnimationFrame(animate);
}

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
let isTyping = true; // Flag to check if initial boot is done

function typeTerminal() {
  if (lineIndex >= lines.length) {
    isTyping = false;
    // Add default waiting state after initial boot
    setTimeout(() => {
      terminal.textContent = "> Access granted.\n> Welcome, Operator.\n> Awaiting input...";
    }, 1000);
    return;
  }
  
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

/* ========== WINDOW RESIZE ========== */
// Handle window resize dynamically without breaking the rain
window.addEventListener("resize", () => {
  initMatrix();
});

/* ========== RADAR ORBIT INTERACTION (UPDATED & BUG-FIXED) ========== */
const cyberLinks = document.querySelectorAll('.cyber-node');
let hoverTimeout; // Prevents overlapping text if user hovers quickly

cyberLinks.forEach(link => {
  link.addEventListener('mouseenter', (e) => {
    // Only trigger if the initial boot sequence is finished
    if (!isTyping) {
      clearTimeout(hoverTimeout); // Stop any ongoing typing from previous hovers
      
      const targetName = e.currentTarget.getAttribute('title');
      
      // Clear the terminal and type the new target
      terminal.textContent = "> Access granted.\n> Welcome, Operator.\n";
      let hoverText = `> Executing module: [${targetName}]...`;
      let i = 0;
      
      function typeHover() {
        if (i < hoverText.length) {
          terminal.textContent += hoverText.charAt(i);
          i++;
          hoverTimeout = setTimeout(typeHover, 30);
        }
      }
      typeHover();
    }
  });

  link.addEventListener('mouseleave', () => {
    if (!isTyping) {
       clearTimeout(hoverTimeout); // Stop typing immediately if mouse leaves early
       // Reset terminal to base state when mouse leaves
       terminal.textContent = "> Access granted.\n> Welcome, Operator.\n> Awaiting input...";
    }
  });
});
