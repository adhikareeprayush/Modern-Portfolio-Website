# Portfolio Website - Template

A modern, responsive portfolio website template for developers. Built with clean HTML, CSS, and JavaScript to help you ship a polished personal site quickly.

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/20eb4fda-4e2f-4d83-a4e2-1ed93f4d28e6" />


## 🎯 Project Overview

This template provides a production-ready portfolio layout with configurable content, multiple themes, and accessible UI patterns.

### ✨ Key Features

- **🎨 Theme-ready Design**: Multiple built-in themes with a custom theme switcher
- **📱 Fully Responsive**: Mobile-first design that works on all devices
- **♿ Accessible**: WCAG 2.1 compliant with proper ARIA labels and keyboard navigation
- **⚡ Performance Optimized**: Fast loading with optimized CSS and JavaScript
- **🎭 Interactive Elements**: Smooth animations, hover effects, and micro-interactions
- **📝 Form Validation**: Real-time form validation with user-friendly error messages
- **🧩 JSON-driven Content**: Update text and lists from `data/content.json`
- **🎪 Project Filtering**: Interactive project gallery with category filtering
- **🔄 Smooth Scrolling**: Navigation with smooth scroll and active section highlighting
- **📲 Mobile Navigation**: Accessible hamburger menu with proper focus management

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern layout techniques (Grid, Flexbox), custom properties, animations
- **JavaScript (ES6+)**: Modern syntax with classes, async/await, and web APIs
- **Web APIs**: Intersection Observer for scroll animations
- **Google Fonts**: Inter and JetBrains Mono for typography

## ✅ What You Get

- Production-ready HTML structure
- Responsive layout and theme support
- JSON-driven content for fast customization
- Accessible navigation and forms

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code recommended)
- Basic understanding of HTML, CSS, and JavaScript

### Installation & Setup

1. **Clone or Download**

   ```bash
   git clone https://github.com/adhikareeprayush/Modern-Portfolio-Website.git
   cd Modern-Portfolio-Website
   ```

2. **Open in Browser**

- Use a local server (required for JSON content loading):

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
Right-click index.html → "Open with Live Server"
```

3. **Start Customizing**

- Update `data/content.json`
- Swap images and links
- Adjust themes in `style.css`

### Project Structure

```
Modern-Portfolio-Website/
├── index.html          # Main HTML file
├── style.css           # Complete CSS styles
├── scripts.js          # JavaScript functionality
├── data/
│   └── content.json     # Configurable content data
├── image.png           # Sample image
├── icons/              # SVG icons
│   ├── favicon.svg
│   ├── close.svg
│   ├── fb.svg
│   ├── hamburger.svg
│   ├── insta.svg
│   └── twitter.svg
└── README.md           # This file
```

## 🔧 Configuration (JSON Content)

Edit `data/content.json` to customize the template without touching HTML. This
file controls the hero, projects, services, testimonials, clients, blog, and
contact details.

Example:

```json
{
  "brand": { "name": "Noa Studio" },
  "hero": {
    "eyebrow": "Product Designer + Front-End Engineer",
    "title": "Calm product design for teams who move with intention.",
    "subtitle": "Strategy, UI, and systems that keep your product simple, elegant, and shippable.",
    "avatar": {
      "src": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
      "alt": "Portrait of Noa"
    }
  }
}
```

If the JSON file is missing or invalid, the HTML fallback content is shown.

## 🎨 Themes

Use the theme switcher in the header to preview built-in themes:

- System Light
- System Dark
- Sand
- Ocean
- Forest
- Dusk
- Mono
- Retro

You can customize theme variables in `style.css` under the `body[data-theme="..."]`
blocks.

## 🧩 Customization Workflow

1. Update content in `data/content.json`
2. Replace images and links
3. Adjust themes in `style.css`

## 🔍 Code Highlights

### Responsive CSS Grid Layout

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
}
```

### Modern JavaScript Class Pattern

```javascript
class MobileNavigation {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.sidebar = document.querySelector(".sidebar");
    this.init();
  }

  init() {
    this.hamburger.addEventListener("click", () => this.openSidebar());
  }
}
```

### Accessibility-First HTML

```html
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <ul class="nav-menu" role="menubar">
    <li role="none">
      <a href="#hero" role="menuitem" aria-label="Go to home section">Home</a>
    </li>
  </ul>
</nav>
```

## 🧪 Testing and Validation

This project emphasizes the importance of testing and validation:

- **HTML Validation**: Use [W3C HTML Validator](https://validator.w3.org/)
- **CSS Validation**: Use [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- **Accessibility Testing**: Use [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- **Performance Testing**: Use Chrome Lighthouse or similar tools
- **Cross-Browser Testing**: Test in multiple browsers and devices

## 🌐 Browser Compatibility

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

The website uses modern web standards with graceful degradation for older browsers.

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: 1280px+

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic markup
- **High Contrast**: Sufficient color contrast ratios (4.5:1 minimum)
- **Focus Management**: Visible focus indicators and logical tab order
- **Reduced Motion**: Respects user's motion preferences
- **Scalable Text**: Works at 200% zoom level

## 🚀 Performance Features

- **Optimized CSS**: Efficient selectors and minimal redundancy
- **Modern JavaScript**: Uses efficient APIs like Intersection Observer
- **Image Optimization**: Proper image dimensions and lazy loading ready
- **Minimal Dependencies**: No external frameworks or libraries
- **Critical CSS**: Above-the-fold styles optimized

## 🎨 Customization Guide

### Changing Colors

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-secondary-color;
  /* Update other color variables */
}
```

### Adding New Sections

1. Add HTML structure following the semantic pattern
2. Style with consistent CSS classes and custom properties
3. Add JavaScript functionality if needed
4. Update navigation links

### Modifying Animations

```css
/* Adjust animation timing */
:root {
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}
```

## 📚 Additional Resources

### External Learning Resources

- **MDN Web Docs**: [developer.mozilla.org](https://developer.mozilla.org/)
- **CSS-Tricks**: [css-tricks.com](https://css-tricks.com/)
- **A11y Project**: [a11yproject.com](https://www.a11yproject.com/)
- **Can I Use**: [caniuse.com](https://caniuse.com/)
- **Web.dev**: [web.dev](https://web.dev/)

## 🤝 Contributing

Contributions are welcome:

1. **Fork the repository**
2. **Make your improvements**
3. **Document your changes**
4. **Submit a pull request**

Types of contributions welcome:

- Bug fixes and improvements
- Additional features or sections
- Enhanced accessibility features
- Documentation improvements
- Educational examples and explanations

## 📄 License

Template created by Prayush Adhikari. Feel free to use it for learning, teaching, and personal projects.

## 🙏 Acknowledgments

- **Web Development Community**: For the wealth of resources and best practices
- **Students**: Who will learn from and improve this project
- **Open Source**: For the tools and resources that make projects like this possible

## 📞 Support and Questions

If you need help integrating this template, open an issue or reach out.

---

_Template created by Prayush Adhikari_
