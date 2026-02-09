/**
 * Portfolio Configuration
 * Edit these values to customize your portfolio
 */

const config = {
  // Personal Information
  personal: {
    name: "Adonyas",
    title: "Creative Designer & Developer",
    tagline: "Building meaningful digital experiences",
    description: "I craft digital products that blend aesthetics with functionality, guided by faith and inspired by family.",
    location: "Nairobi, Kenya",
    email: "yafetchernet2023@gmail.com",
    altEmail: "hello@adonyas.design",
    website: "https://adonyas.design",
    calendly: "https://calendly.com/yafetchernet2023/30min",
    formspree: "https://formspree.io/f/your-form-id"
  },

  // Social Media Links
  social: {
    linkedin: {
      url: "https://linkedin.com/in/yourprofile",
      username: "yourprofile",
      label: "LinkedIn Profile"
    },
    twitter: {
      url: "https://twitter.com/yourhandle",
      username: "yourhandle",
      label: "Twitter Profile"
    },
    instagram: {
      url: "https://instagram.com/yourhandle",
      username: "yourhandle",
      label: "Instagram Profile"
    },
    github: {
      url: "https://github.com/yourusername",
      username: "yourusername",
      label: "GitHub Profile"
    },
    dribbble: {
      url: "https://dribbble.com/yourusername",
      username: "yourusername",
      label: "Dribbble Profile"
    },
    behance: {
      url: "https://behance.net/yourusername",
      username: "yourusername",
      label: "Behance Profile"
    }
  },

  // Experience & Stats
  experience: {
    years: "5+",
    projects: "50+",
    clients: "30+"
  },

  // CV/Resume
  cv: {
    pdfUrl: "assets/cv.pdf",
    fileName: "Adonyas_CV.pdf"
  },

  // SEO & Meta
  meta: {
    ogImage: "https://adonyas.design/og-image.jpg",
    twitterHandle: "@yourhandle"
  }
};

// Export for use in other scripts
window.portfolioConfig = config;
