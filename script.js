AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: false,
  mirror: true,
});

// Theme toggle functionality
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

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Home link reload
document.querySelectorAll('a[href="#home"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
  });
});

// Smooth scrolling for other links
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

// Animated text rotation
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

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Form submission handling
document.querySelector('.contact-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission
  const form = e.target;
  const formData = new FormData(form);
  const messageDiv = document.getElementById('form-message');

  // Ensure messageDiv exists
  if (!messageDiv) {
    console.error('Error: #form-message div not found in the form.');
    alert('Form error: Message display element missing.');
    return;
  }

  // Show a loading message
  messageDiv.style.display = 'block';
  messageDiv.style.color = 'blue';
  messageDiv.textContent = 'Sending your message...';

  try {
    const response = await fetch('https://formspree.io/f/mnnplakb', { // Hardcode the endpoint for clarity
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    const responseData = await response.json(); // Get detailed response
    console.log('Formspree Response:', responseData); // Log for debugging

    if (response.ok) {
      messageDiv.style.color = 'green';
      messageDiv.textContent = 'Thank you! Your message has been sent successfully.';
      form.reset(); // Clear the form
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 3000); // Hide after 3 seconds
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = `Error: ${responseData.error || 'Something went wrong. Please try again.'}`;
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000); // Longer display for error
    }
  } catch (error) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Error: Network issue or Formspree unavailable. Please try again later.';
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 5000);
    console.error('Form submission error:', error);
  }
});