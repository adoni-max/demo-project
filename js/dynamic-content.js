/**
 * Dynamic Content Loader
 * Populates HTML elements with values from config.js
 */

(function() {
  'use strict';

  // Wait for config to load
  function init() {
    if (typeof window.portfolioConfig === 'undefined') {
      console.warn('Portfolio config not found. Using default values.');
      return;
    }

    const config = window.portfolioConfig;

    // Populate personal info
    populatePersonalInfo(config.personal);

    // Populate social links
    populateSocialLinks(config.social);

    // Populate CV download links
    populateCVLink(config.cv);

    // Populate form action URLs
    populateForms(config.personal);
  }

  // Populate personal information
  function populatePersonalInfo(personal) {
    // Name elements
    const nameElements = document.querySelectorAll('[data-name]');
    nameElements.forEach(el => {
      el.textContent = personal.name;
      el.setAttribute('aria-label', personal.name);
    });

    // Title elements
    const titleElements = document.querySelectorAll('[data-title]');
    titleElements.forEach(el => el.textContent = personal.title);

    // Tagline elements
    const taglineElements = document.querySelectorAll('[data-tagline]');
    taglineElements.forEach(el => el.textContent = personal.tagline);

    // Email elements
    const emailElements = document.querySelectorAll('[data-email]');
    emailElements.forEach(el => {
      el.textContent = personal.email;
      el.href = `mailto:${personal.email}`;
      el.setAttribute('aria-label', `Email ${personal.name}`);
    });

    // Alt email elements
    const altEmailElements = document.querySelectorAll('[data-alt-email]');
    altEmailElements.forEach(el => {
      el.textContent = personal.altEmail;
      el.href = `mailto:${personal.altEmail}`;
    });

    // Location elements
    const locationElements = document.querySelectorAll('[data-location]');
    locationElements.forEach(el => el.textContent = personal.location);
  }

  // Populate social media links
  function populateSocialLinks(social) {
    // LinkedIn
    const linkedinElements = document.querySelectorAll('[data-social="linkedin"]');
    linkedinElements.forEach(el => {
      el.href = social.linkedin.url;
      el.setAttribute('aria-label', social.linkedin.label);
      el.setAttribute('title', social.linkedin.label);
    });

    // Twitter/X
    const twitterElements = document.querySelectorAll('[data-social="twitter"]');
    twitterElements.forEach(el => {
      el.href = social.twitter.url;
      el.setAttribute('aria-label', social.twitter.label);
      el.setAttribute('title', social.twitter.label);
    });

    // Instagram
    const instagramElements = document.querySelectorAll('[data-social="instagram"]');
    instagramElements.forEach(el => {
      el.href = social.instagram.url;
      el.setAttribute('aria-label', social.instagram.label);
      el.setAttribute('title', social.instagram.label);
    });

    // GitHub
    const githubElements = document.querySelectorAll('[data-social="github"]');
    githubElements.forEach(el => {
      el.href = social.github.url;
      el.setAttribute('aria-label', social.github.label);
      el.setAttribute('title', social.github.label);
    });

    // Dribbble
    const dribbbleElements = document.querySelectorAll('[data-social="dribbble"]');
    dribbbleElements.forEach(el => {
      el.href = social.dribbble.url;
      el.setAttribute('aria-label', social.dribbble.label);
      el.setAttribute('title', social.dribbble.label);
    });

    // Behance
    const behanceElements = document.querySelectorAll('[data-social="behance"]');
    behanceElements.forEach(el => {
      el.href = social.behance.url;
      el.setAttribute('aria-label', social.behance.label);
      el.setAttribute('title', social.behance.label);
    });
  }

  // Populate CV download links
  function populateCVLink(cv) {
    const cvElements = document.querySelectorAll('[data-cv]');
    cvElements.forEach(el => {
      el.href = cv.pdfUrl;
      el.setAttribute('download', cv.fileName);
    });
  }

  // Populate form action URLs
  function populateForms(personal) {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.action = personal.formspree;
    }

    // Collaboration modal Calendly link
    const calendlyLink = document.querySelector('[data-calendly]');
    if (calendlyLink) {
      calendlyLink.href = personal.calendly;
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
