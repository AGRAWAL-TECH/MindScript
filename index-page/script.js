// Tailwind config for colors
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        neutral: {
          dark: 'var(--color-neutral-dark)',
          light: 'var(--color-neutral-light)',
        },
      },
    },
  },
};

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  mobileMenu.classList.toggle('hidden');
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
const htmlElement = document.documentElement;
const bodyElement = document.body;

function setDarkMode(enabled) {
  if (enabled) {
    bodyElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (darkModeToggleMobile) darkModeToggleMobile.innerHTML = '<i class="fas fa-sun mr-2"></i>Toggle Light Mode';
  } else {
    bodyElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    if (darkModeToggleMobile) darkModeToggleMobile.innerHTML = '<i class="fas fa-moon mr-2"></i>Toggle Dark Mode';
  }
}

// Initialize dark mode based on preference or system
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true' || (!savedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setDarkMode(true);
} else {
  setDarkMode(false);
}

darkModeToggle.addEventListener('click', () => {
  setDarkMode(!bodyElement.classList.contains('dark'));
});
if (darkModeToggleMobile) {
  darkModeToggleMobile.addEventListener('click', () => {
    setDarkMode(!bodyElement.classList.contains('dark'));
  });
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Login modal open/close
const loginModal = document.getElementById('loginModal');
const loginButtons = document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#loginModal"]');
const closeLoginModalBtn = document.getElementById('closeLoginModal');

loginButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
    loginModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    document.getElementById('email').focus();
  });
});
closeLoginModalBtn.addEventListener('click', () => {
  loginModal.classList.add('hidden');
  loginModal.classList.remove('flex');
  document.body.style.overflow = '';
});
loginModal.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.classList.add('hidden');
    loginModal.classList.remove('flex');
    document.body.style.overflow = '';
  }
});

// Login form validation and submission (dummy)
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();
  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }
  alert('Login successful (dummy)');
  loginModal.classList.add('hidden');
  loginModal.classList.remove('flex');
  document.body.style.overflow = '';
  loginForm.reset();
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
      slide.removeAttribute('hidden');
      slide.setAttribute('aria-hidden', 'false');
    } else {
      slide.classList.remove('active');
      slide.setAttribute('hidden', '');
      slide.setAttribute('aria-hidden', 'true');
    }
  });
}
prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});
nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});
// Auto slide every 8 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 8000);

// FAQ Accordion
const accordionButtons = document.querySelectorAll('[data-accordion] > button');
accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    // Close all
    accordionButtons.forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      panel.classList.remove('open');
      btn.querySelector('svg').style.transform = 'rotate(0deg)';
    });
    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      panel.classList.add('open');
      button.querySelector('svg').style.transform = 'rotate(180deg)';
    }
  });
});

// Initialize AOS animations
AOS.init({
  once: true,
  duration: 800,
  easing: 'ease-in-out',
});