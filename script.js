AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: false,
  mirror: true,
});
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const toggleSlider = document.querySelector('.toggle-slider');
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

lightIcon.textContent = "🌞";
darkIcon.textContent = "🌙✨";

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');

  if (isDarkMode) {
    toggleSlider.style.transform = 'translateX(28px)';
    lightIcon.style.opacity = '0';
    darkIcon.style.opacity = '1';
    darkIcon.style.animation = 'twinkle 1.5s infinite ease-in-out';
  } else {
    toggleSlider.style.transform = 'translateX(2px)';
    lightIcon.style.opacity = '1';
    darkIcon.style.opacity = '0';
    darkIcon.style.animation = 'none';
  }
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleSlider.style.transform = 'translateX(28px)';
    lightIcon.style.opacity = '0';
    darkIcon.style.opacity = '1';
    darkIcon.style.animation = 'twinkle 1.5s infinite ease-in-out';
  }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('a[href="#home"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  if (anchor.getAttribute('href') !== '#home') {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      const headerHeight = document.querySelector('header').offsetHeight;
      window.scrollTo({
        top: target.offsetTop - headerHeight,
        behavior: 'smooth',
      });
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }
});

const changingText = document.querySelector('.changing-text');
const roles = ["Competitive Programmer", "Developer", "Web Designer"];
let roleIndex = 0;

function updateText() {
  changingText.style.opacity = 0;
  setTimeout(() => {
    changingText.textContent = roles[roleIndex];
    changingText.style.opacity = 1;
    roleIndex = (roleIndex + 1) % roles.length;
  }, 500);
}

setInterval(updateText, 3000);

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});