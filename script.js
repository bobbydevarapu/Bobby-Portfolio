// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: false,
  mirror: true
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
  }
});

// Text Animation
const changingText = document.querySelector('.changing-text');
const roles = ["Developer", "Programmer", "Tech Enthusiast"];
let roleIndex = 0;

function updateText() {
  changingText.style.opacity = 0;
  setTimeout(() => {
      changingText.textContent = roles[roleIndex];
      changingText.style.opacity = 1;
      roleIndex = (roleIndex + 1) % roles.length;
  }, 500);
}

setInterval(updateText, 2000);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const headerHeight = document.querySelector('header').offsetHeight;
      window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: 'smooth'
      });
  });
});

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
      card.querySelector('.project-link i').style.transform = 'translateX(5px)';
  });
  
  card.addEventListener('mouseleave', () => {
      card.querySelector('.project-link i').style.transform = 'translateX(0)';
  });
});

// Footer Animation
const footerElements = document.querySelectorAll('footer *');
footerElements.forEach(el => {
  el.setAttribute('data-aos-offset', '100');
});