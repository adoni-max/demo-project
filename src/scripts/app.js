/**
 * Alex Chen Portfolio - Main JavaScript
 * Handles animations, interactions, and dynamic behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollProgress();
  initRevealAnimations();
  initSmoothScroll();
  initMobileMenu();
});

/**
 * Custom Cursor
 * Creates a custom cursor that follows mouse movement
 */
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (!cursor || !cursorDot) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .work-item, .philosophy-card, .story-value');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null) {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    }
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
}

/**
 * Scroll Progress Indicator
 * Shows progress as user scrolls down the page
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  
  if (!progressBar) return;
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
  }
  
  window.addEventListener('scroll', updateProgress);
}

/**
 * Reveal Animations
 * Triggers animations when elements enter viewport
 */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');
  
  if (revealElements.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

/**
 * Smooth Scroll
 * Enables smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });
}

/**
 * Mobile Menu Toggle
 * Handles mobile navigation menu
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuToggle || !navLinks) return;
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

/**
 * Magnetic Effect
 * Makes buttons and links have a magnetic effect on hover
 */
document.querySelectorAll('.magnetic').forEach(element => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0)';
  });
});

/**
 * Contact Form Handler
 * Validates and handles form submission
 */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    if (!isValidEmail(data.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
  });
}

/**
 * Email Validation
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show Notification
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '16px 24px',
    background: type === 'success' ? 'var(--accent-cyan)' : '#ef4444',
    color: '#fff',
    borderRadius: '8px',
    zIndex: '10000',
    animation: 'slideIn 0.3s ease'
  });
  
  // Add animation keyframes
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

/**
 * Lazy Loading Images
 * Improves performance by loading images only when they enter viewport
 */
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Initialize lazy loading
lazyLoadImages();
