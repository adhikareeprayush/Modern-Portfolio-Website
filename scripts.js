/**
 * Modern Portfolio Website JavaScript
 * Features: Mobile Navigation, Smooth Scrolling, Form Validation,
 * Project Filtering, Typing Animation, Scroll Animations
 *
 * Educational Purpose: Demonstrates modern JavaScript patterns and best practices
 * for web development students.
 */

// ===========================================
// 1. MOBILE NAVIGATION FUNCTIONALITY
// ===========================================

/**
 * Manages mobile sidebar navigation
 * Includes hamburger menu toggle and accessibility features
 */
class MobileNavigation {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.sidebar = document.querySelector(".sidebar");
    this.closeBtn = document.querySelector(".close-btn");
    this.sidebarLinks = document.querySelectorAll(".sidebar a");

    this.init();
  }

  init() {
    if (!this.hamburger || !this.sidebar || !this.closeBtn) return;

    // Event listeners for menu toggle
    this.hamburger.addEventListener("click", () => this.openSidebar());
    this.closeBtn.addEventListener("click", () => this.closeSidebar());

    // Close sidebar when clicking on links
    this.sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeSidebar());
    });

    // Close sidebar on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.sidebar.classList.contains("active")) {
        this.closeSidebar();
      }
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.sidebar.classList.contains("active") &&
        !this.sidebar.contains(e.target) &&
        !this.hamburger.contains(e.target)
      ) {
        this.closeSidebar();
      }
    });
  }

  openSidebar() {
    this.sidebar.classList.add("active");
    this.hamburger.setAttribute("aria-expanded", "true");
    this.sidebar.setAttribute("aria-hidden", "false");

    // Focus management for accessibility
    this.closeBtn.focus();

    // Prevent body scroll when sidebar is open
    document.body.style.overflow = "hidden";
  }

  closeSidebar() {
    this.sidebar.classList.remove("active");
    this.hamburger.setAttribute("aria-expanded", "false");
    this.sidebar.setAttribute("aria-hidden", "true");

    // Restore body scroll
    document.body.style.overflow = "";

    // Return focus to hamburger button
    this.hamburger.focus();
  }
}

// ===========================================
// 2. SMOOTH SCROLLING AND NAVIGATION
// ===========================================

/**
 * Handles smooth scrolling to sections and active navigation highlighting
 */
class SmoothScrolling {
  constructor() {
    this.navLinks = document.querySelectorAll('a[href^="#"]');
    this.sections = document.querySelectorAll("section[id]");

    this.init();
  }

  init() {
    // Add smooth scroll behavior to navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Highlight active section in navigation
    window.addEventListener("scroll", () => this.highlightActiveSection());
  }

  highlightActiveSection() {
    const scrollPos = window.scrollY + 100;

    this.sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos <= bottom) {
        // Remove active class from all nav links
        this.navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to current section link
        const activeLink = document.querySelector(`a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }
}

// ===========================================
// 3. PROJECT FILTERING SYSTEM
// ===========================================

/**
 * Manages project filtering functionality with smooth animations
 */
class ProjectFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.projectCards = document.querySelectorAll(".project-card");

    this.init();
  }

  init() {
    if (this.filterButtons.length === 0) return;

    this.filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const filter = e.target.getAttribute("data-filter");
        this.filterProjects(filter);
        this.setActiveButton(e.target);
      });
    });
  }

  filterProjects(filter) {
    this.projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "block";
        card.classList.add("fade-in");

        // Remove animation class after animation completes
        setTimeout(() => {
          card.classList.remove("fade-in");
        }, 600);
      } else {
        card.style.display = "none";
      }
    });
  }

  setActiveButton(activeButton) {
    // Remove active class from all buttons
    this.filterButtons.forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-selected", "false");
    });

    // Add active class to clicked button
    activeButton.classList.add("active");
    activeButton.setAttribute("aria-selected", "true");
  }
}

// ===========================================
// 4. FORM VALIDATION AND SUBMISSION
// ===========================================

/**
 * Handles contact form validation with real-time feedback
 */
class FormValidator {
  constructor() {
    this.form = document.getElementById("contact-form");
    this.submitButton = this.form?.querySelector(".form-submit");
    this.successMessage = document.getElementById("form-success");

    this.init();
  }

  init() {
    if (!this.form) return;

    // Add real-time validation
    const inputs = this.form.querySelectorAll(".form-input, .form-textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearErrors(input));
    });

    // Handle form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);

    let isValid = true;
    let errorMessage = "";

    // Validation rules
    switch (fieldName) {
      case "name":
        if (!value) {
          errorMessage = "Name is required";
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = "Name must be at least 2 characters";
          isValid = false;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = "Email is required";
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address";
          isValid = false;
        }
        break;

      case "message":
        if (!value) {
          errorMessage = "Message is required";
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = "Message must be at least 10 characters";
          isValid = false;
        }
        break;
    }

    // Display validation result
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }

    field.classList.toggle("error", !isValid);
    return isValid;
  }

  clearErrors(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = "";
    }
    field.classList.remove("error");
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const inputs = this.form.querySelectorAll(".form-input, .form-textarea");
    let isFormValid = true;

    inputs.forEach((input) => {
      if (input.hasAttribute("required")) {
        if (!this.validateField(input)) {
          isFormValid = false;
        }
      }
    });

    if (!isFormValid) {
      return;
    }

    // Simulate form submission
    await this.submitForm();
  }

  async submitForm() {
    const btnText = this.submitButton.querySelector(".btn-text");
    const btnLoading = this.submitButton.querySelector(".btn-loading");

    // Show loading state
    btnText.style.display = "none";
    btnLoading.style.display = "inline";
    this.submitButton.disabled = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset button state
    btnText.style.display = "inline";
    btnLoading.style.display = "none";
    this.submitButton.disabled = false;

    // Show success message
    this.successMessage.style.display = "block";
    this.form.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      this.successMessage.style.display = "none";
    }, 5000);
  }
}

// ===========================================
// 5. TYPING ANIMATION EFFECT
// ===========================================

/**
 * Creates a typewriter effect for text elements
 */
class TypingAnimation {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.options = {
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      ...options,
    };

    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.init();
  }

  init() {
    if (!this.element || this.texts.length === 0) return;

    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting
      ? this.options.backSpeed
      : this.options.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = this.options.backDelay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===========================================
// 6. SCROLL ANIMATIONS
// ===========================================

/**
 * Handles scroll-triggered animations using Intersection Observer
 */
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.init();
  }

  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.observerOptions
    );

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".project-card, .skill-category, .contact-item, .about-text, .hero-content"
    );

    animatedElements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");

        // Add staggered animation for grid items
        if (entry.target.classList.contains("project-card")) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            100;
          entry.target.style.animationDelay = `${delay}ms`;
        }
      }
    });
  }
}

// ===========================================
// 7. HEADER SCROLL EFFECT
// ===========================================

/**
 * Adds scroll effects to the header (background opacity, etc.)
 */
class HeaderScrollEffect {
  constructor() {
    this.header = document.querySelector("header");
    this.init();
  }

  init() {
    if (!this.header) return;

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        this.header.classList.add("scrolled");
      } else {
        this.header.classList.remove("scrolled");
      }
    });
  }
}

// ===========================================
// 8. INITIALIZATION
// ===========================================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  new MobileNavigation();
  new SmoothScrolling();
  new ProjectFilter();
  new FormValidator();
  new ScrollAnimations();
  new HeaderScrollEffect();

  // Initialize typing animation for hero subtitle
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    const texts = [
      "Full Stack Developer & UI/UX Designer",
      "Creative Problem Solver",
      "Code Enthusiast",
      "Digital Innovation Specialist",
    ];

    // Store original text
    const originalText = heroSubtitle.textContent;

    // Start typing animation after a delay
    setTimeout(() => {
      new TypingAnimation(heroSubtitle, texts, {
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2500,
      });
    }, 2000);
  }

  // Add loading class removal for smooth entrance
  document.body.classList.add("loaded");

  // Performance monitoring (for educational purposes)
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page loaded in ${loadTime}ms`);
    });
  }
});

// ===========================================
// 9. UTILITY FUNCTIONS
// ===========================================

/**
 * Utility functions for common operations
 */
const Utils = {
  // Debounce function for performance optimization
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};

// Export for module usage (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    MobileNavigation,
    SmoothScrolling,
    ProjectFilter,
    FormValidator,
    TypingAnimation,
    ScrollAnimations,
    Utils,
  };
}
