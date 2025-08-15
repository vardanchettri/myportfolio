// Simple fade-in animations on scroll
const elements = document.querySelectorAll('section, footer');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

elements.forEach(el => observer.observe(el));
