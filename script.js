// ===== Background Canvas for Yellow Balls that move up on scroll =====

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

const colors = ['#FFD700', '#398cc4ff', '#4fba3cff']; // yellow shades
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.baseY = Math.random() * canvas.height;  // fixed y starting position
    this.radius = Math.random() * 20 + 20;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw(yOffset) {
    let y = this.baseY - yOffset;

    // Wrap particle to bottom when it moves out of the top viewport
    if (y + this.radius < 0) {
      y += canvas.height + this.radius * 2;
    }

    ctx.beginPath();
    ctx.arc(this.x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles(count = 10) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Use scroll position as vertical offset for particles
  const yOffset = window.scrollY * 0.5;  // adjust multiplier to control speed

  particles.forEach(p => {
    p.draw(yOffset);
  });

  requestAnimationFrame(animate);
}

initParticles();
animate();


// ===== Fade-In Animations on Scroll =====

const elements = document.querySelectorAll('section, footer');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

elements.forEach(el => observer.observe(el));
