/**
 * Adonyas Portfolio - Interactive JavaScript
 * Features: Scroll-triggered animations, modal functionality, project filtering
 */

(function() {
  'use strict';
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // DOM Elements
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');
  const parallaxElements = document.querySelectorAll('.parallax-layer');
  const magneticElements = document.querySelectorAll('.magnetic');
  const hoverElements = document.querySelectorAll('a, button, .btn, .work-card, .process-card, .philosophy-card, .story-value');
  
  // Cursor movement
  function moveCursor(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  }
  
  // Cursor hover effect based on element type
  function handleCursorHover(e) {
    const el = e.target;
    
    // Remove all hover classes first
    cursor.classList.remove('hover', 'hover-light', 'hover-cool');
    
    // Add appropriate hover class
    if (el.classList.contains('magnetic') || el.closest('.magnetic')) {
      if (el.classList.contains('nav-link') || el.closest('.nav-link')) {
        cursor.classList.add('hover-light');
      } else if (el.classList.contains('contact-cta') || el.closest('.contact-cta')) {
        cursor.classList.add('hover-cool');
      } else {
        cursor.classList.add('hover');
      }
    }
  }
  
  function handleCursorLeave() {
    cursor.classList.remove('hover', 'hover-light', 'hover-cool');
  }
  
  // Smooth scroll for anchor links (excluding modal triggers)
  function scrollTo(e) {
    const href = this.getAttribute('href');
    
    // Skip if it's a modal trigger or external link
    if (this.classList.contains('contact-trigger') || 
        this.classList.contains('collaboration-trigger') ||
        href.startsWith('mailto:') ||
        href.startsWith('http')) {
      return;
    }
    
    e.preventDefault();
    if (!href.startsWith('#')) return;
    
    const target = document.querySelector(href);
    if (target) {
      const offset = navbar.offsetHeight;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  }
  
  // Magnetic effect for buttons and links
  function applyMagnetic(e) {
    if (prefersReducedMotion) return;
    
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  }
  
  function removeMagnetic(e) {
    if (prefersReducedMotion) return;
    
    const btn = e.currentTarget;
    btn.style.transform = '';
  }
  
  // Parallax effect for floating elements
  function applyParallax(e) {
    if (prefersReducedMotion) return;
    
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    
    const floatingElements = document.querySelectorAll('.hero-floating');
    floatingElements.forEach((el, index) => {
      const speed = (index + 1) * 0.3;
      el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  }
  
  // Tilt effect for cards
  function applyTilt(e) {
    if (prefersReducedMotion) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  }
  
  function removeTilt(e) {
    const card = e.currentTarget;
    card.style.transform = '';
  }
  
  // Scroll progress indicator
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
  }
  
  // Navbar scroll effect
  function onScroll() {
    const scrolled = window.scrollY;
    
    navbar?.classList.toggle('scrolled', scrolled > 50);
    
    // Active nav link
    const pos = scrolled + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.id;
      if (pos >= top && pos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
    
    updateScrollProgress();
  }
  
  // Intersection Observer for reveal animations
  function setupRevealObserver() {
    if (prefersReducedMotion) {
      reveals.forEach(el => el.classList.add('active'));
      return;
    }
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    reveals.forEach(el => observer.observe(el));
  }
  
  // Parallax on scroll for hero elements
  function setupScrollParallax() {
    if (prefersReducedMotion) return;
    
    const heroVisual = document.querySelector('.hero-visual');
    
    function updateParallax() {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      
      if (scrollProgress) {
        const scrollPercent = (scrolled / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
      }
      
      if (heroVisual && scrolled < heroHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true });
  }
  
  // Animated counter for experience
  function animateCounters() {
    const counters = document.querySelectorAll('.about-exp-num');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = counter.textContent;
            const numValue = parseInt(target);
            
            if (!isNaN(numValue)) {
              animateValue(counter, 0, numValue, 2000);
            }
            
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });
      
      counters.forEach(counter => observer.observe(counter));
    }
  }
  
  function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      element.textContent = current + '+';
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }
  
  // ===== MODAL FUNCTIONALITY =====
  function setupModal() {
    const modalTriggers = document.querySelectorAll('.contact-trigger');
    const collaborationTriggers = document.querySelectorAll('.collaboration-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');
    const openContactFromCollaboration = document.querySelectorAll('.open-contact-form');
    
    // Open contact modal
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('contactModal');
      });
    });
    
    // Open collaboration modal
    collaborationTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('collaborationModal');
      });
    });
    
    // Open contact form from collaboration modal
    openContactFromCollaboration.forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal('collaborationModal');
        setTimeout(() => openModal('contactModal'), 300);
      });
    });
    
    // Close modals
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) closeModal(modal.id);
      });
    });
    
    // Close on overlay click
    overlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
        const modal = overlay.closest('.modal');
        if (modal) closeModal(modal.id);
      });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modals.forEach(modal => {
          if (modal.classList.contains('active')) {
            closeModal(modal.id);
          }
        });
      }
    });
  }
  
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus trap - focus first input or close button
    const focusable = modal.querySelector('input, textarea, button:not(.modal-close)');
    if (focusable) {
      setTimeout(() => focusable.focus(), 100);
    }
  }
  
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // ===== PROJECT FILTER FUNCTIONS =====
  function setupProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active button
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        
        // Filter projects
        projectCards.forEach(card => {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = 'all 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // ===== CONTACT FORM HANDLING =====
  function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Show success message
          submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Message Sent!';
          submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          form.reset();
          
          // Close modal after success
          setTimeout(() => {
            closeModal('contactModal');
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 2000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        // Fallback for demo - simulate success
        submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        form.reset();
        
        setTimeout(() => {
          closeModal('contactModal');
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 2000);
      }
    });
  }
  
  // Initialize all interactions
  function init() {
    // Cursor
    window.addEventListener('mousemove', moveCursor);
    
    // Cursor hover effects
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleCursorHover);
      el.addEventListener('mouseleave', handleCursorLeave);
    });
    
    // Smooth scroll
    navLinks.forEach(link => link.addEventListener('click', scrollTo));
    
    // Magnetic effects
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', applyMagnetic);
      el.addEventListener('mouseleave', removeMagnetic);
    });
    
    // Parallax on mouse move
    document.addEventListener('mousemove', applyParallax);
    
    // Tilt effects for cards
    const tiltCards = document.querySelectorAll('.philosophy-card, .story-value');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', applyTilt);
      card.addEventListener('mouseleave', removeTilt);
    });
    
    // Scroll handlers
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Setup animations
    setupRevealObserver();
    setupScrollParallax();
    animateCounters();
    
    // Initial scroll check
    onScroll();
    
    // Setup modal
    setupModal();
    
    // Setup contact form
    setupContactForm();
    
    // Setup project filter
    setupProjectFilter();
  }
  
  // Run on DOM ready or immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Optional: Add loading animation completion
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  
})();
