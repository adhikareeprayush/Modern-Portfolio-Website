/**
 * Modern Portfolio Website JavaScript
 * Features: Mobile Navigation, Smooth Scrolling, Form Validation,
 * Project Filtering, Scroll Animations, Theme Switcher
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
// Typing animation removed for a static hero.

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
      this.observerOptions,
    );

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".hero-content, .project-card, .service-card, .testimonial-card, .client-card, .blog-card, .contact-card, .newsletter-card",
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
// 8. THEME SELECTOR
// ===========================================

class ThemeSelector {
  constructor(root) {
    this.root = root;
    this.button = root.querySelector(".theme-select__button");
    this.label = root.querySelector(".theme-select__current");
    this.menu = root.querySelector(".theme-select__menu");
    this.options = Array.from(root.querySelectorAll(".theme-select__option"));
    this.init();
  }

  init() {
    if (
      !this.button ||
      !this.label ||
      !this.menu ||
      this.options.length === 0
    ) {
      return;
    }

    const savedTheme = localStorage.getItem("theme") || "system-light";
    this.setTheme(savedTheme, false);

    this.button.addEventListener("click", () => {
      this.root.classList.toggle("is-open");
      this.button.setAttribute(
        "aria-expanded",
        this.root.classList.contains("is-open") ? "true" : "false",
      );
    });

    this.options.forEach((option) => {
      option.addEventListener("click", () => {
        const nextTheme = option.dataset.value;
        if (nextTheme) {
          this.setTheme(nextTheme, true);
        }
        this.closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (!this.root.contains(event.target)) {
        this.closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeMenu();
      }
    });
  }

  setTheme(theme, persist) {
    const matched = this.options.find(
      (option) => option.dataset.value === theme,
    );
    const labelText = matched?.textContent || "System Light";

    document.body.dataset.theme = theme;
    this.label.textContent = labelText;

    this.options.forEach((option) => {
      option.setAttribute(
        "aria-selected",
        option.dataset.value === theme ? "true" : "false",
      );
    });

    if (persist) {
      localStorage.setItem("theme", theme);
    }
  }

  closeMenu() {
    if (!this.root.classList.contains("is-open")) return;
    this.root.classList.remove("is-open");
    this.button.setAttribute("aria-expanded", "false");
  }
}

// ===========================================
// 9. CONTENT LOADER
// ===========================================

class ContentLoader {
  constructor(url) {
    this.url = url;
  }

  async load() {
    try {
      const response = await fetch(this.url, { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      this.apply(data);
    } catch (error) {
      console.warn("Content JSON not loaded", error);
    }
  }

  apply(data) {
    if (!data) return;

    this.setTextAll("brand.name", data.brand?.name);
    this.setTextAll("hero.eyebrow", data.hero?.eyebrow);
    this.setTextAll("hero.title", data.hero?.title);
    this.setTextAll("hero.subtitle", data.hero?.subtitle);
    this.setImage("hero.avatar", data.hero?.avatar);

    this.setTextAll("contact.availability", data.contact?.availability);
    this.setLink("contact.email", data.contact?.email, "mailto:");
    this.setLink("contact.phone", data.contact?.phone, "tel:");
    this.setTextAll("contact.location", data.contact?.location);
    this.setTextAll("footer.tagline", data.footer?.tagline);

    this.renderProjects(data.projects);
    this.renderServices(data.services);
    this.renderTestimonials(data.testimonials);
    this.renderClients(data.clients);
    this.renderBlog(data.blog);
  }

  setTextAll(key, value) {
    if (!value) return;
    document.querySelectorAll(`[data-site="${key}"]`).forEach((node) => {
      node.textContent = value;
    });
  }

  setImage(key, image) {
    if (!image?.src) return;
    document.querySelectorAll(`[data-site="${key}"]`).forEach((node) => {
      node.setAttribute("src", image.src);
      node.setAttribute("alt", image.alt || "");
    });
  }

  setLink(key, value, prefix) {
    if (!value) return;
    document.querySelectorAll(`[data-site="${key}"]`).forEach((node) => {
      node.textContent = value;
      node.setAttribute("href", `${prefix}${value}`);
    });
  }

  renderProjects(items) {
    const container = document.querySelector('[data-list="projects"]');
    if (!container || !Array.isArray(items) || items.length === 0) return;
    container.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.setAttribute("role", "listitem");

      const info = document.createElement("div");
      info.className = "project-info";

      const label = document.createElement("p");
      label.className = "project-label";
      label.textContent = item.label || "";

      const title = document.createElement("h3");
      title.className = "project-title";
      title.textContent = item.title || "";

      const description = document.createElement("p");
      description.className = "project-description";
      description.textContent = item.description || "";

      const meta = document.createElement("div");
      meta.className = "project-meta";
      (item.tags || []).forEach((tag) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        meta.appendChild(span);
      });

      info.append(label, title, description, meta);

      const footer = document.createElement("div");
      footer.className = "project-footer";
      if (item.link?.label) {
        const link = document.createElement("a");
        link.className = "text-link";
        link.href = item.link.href || "#";
        link.textContent = item.link.label;
        footer.appendChild(link);
      }

      card.append(info, footer);
      container.appendChild(card);
    });
  }

  renderServices(items) {
    const container = document.querySelector('[data-list="services"]');
    if (!container || !Array.isArray(items) || items.length === 0) return;
    container.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "service-card";
      card.setAttribute("role", "listitem");

      if (item.image?.src) {
        const img = document.createElement("img");
        img.src = item.image.src;
        img.alt = item.image.alt || "";
        card.appendChild(img);
      }

      const title = document.createElement("h3");
      title.textContent = item.title || "";

      const description = document.createElement("p");
      description.textContent = item.description || "";

      card.append(title, description);
      container.appendChild(card);
    });
  }

  renderTestimonials(items) {
    const container = document.querySelector('[data-list="testimonials"]');
    if (!container || !Array.isArray(items) || items.length === 0) return;
    container.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "testimonial-card";
      card.setAttribute("role", "listitem");

      const quote = document.createElement("p");
      quote.textContent = item.quote ? `"${item.quote}"` : "";

      const footer = document.createElement("div");
      footer.className = "testimonial-footer";

      if (item.avatar?.src) {
        const img = document.createElement("img");
        img.src = item.avatar.src;
        img.alt = item.avatar.alt || "";
        footer.appendChild(img);
      }

      const textWrap = document.createElement("div");
      const name = document.createElement("h4");
      name.textContent = item.name || "";
      const role = document.createElement("span");
      role.textContent = item.role || "";

      textWrap.append(name, role);
      footer.appendChild(textWrap);

      card.append(quote, footer);
      container.appendChild(card);
    });
  }

  renderClients(items) {
    const container = document.querySelector('[data-list="clients"]');
    if (!container || !Array.isArray(items) || items.length === 0) return;
    container.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "client-card";
      card.setAttribute("role", "listitem");

      if (item.image?.src) {
        const img = document.createElement("img");
        img.src = item.image.src;
        img.alt = item.image.alt || "";
        card.appendChild(img);
      }

      const name = document.createElement("span");
      name.textContent = item.name || "";
      card.appendChild(name);

      container.appendChild(card);
    });
  }

  renderBlog(items) {
    const container = document.querySelector('[data-list="blog"]');
    if (!container || !Array.isArray(items) || items.length === 0) return;
    container.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "blog-card";
      card.setAttribute("role", "listitem");

      const meta = document.createElement("p");
      meta.className = "blog-meta";
      meta.textContent = item.meta || "";

      const title = document.createElement("h3");
      title.className = "blog-title";
      title.textContent = item.title || "";

      const excerpt = document.createElement("p");
      excerpt.className = "blog-excerpt";
      excerpt.textContent = item.excerpt || "";

      const link = document.createElement("a");
      link.className = "text-link";
      link.href = item.link?.href || "#";
      link.textContent = item.link?.label || "Read article";

      card.append(meta, title, excerpt, link);
      container.appendChild(card);
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

  const themeSelect = document.querySelector("[data-theme-select]");
  if (themeSelect) {
    new ThemeSelector(themeSelect);
  }

  const contentLoader = new ContentLoader("data/content.json");
  contentLoader.load();

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
    ScrollAnimations,
    Utils,
  };
}
