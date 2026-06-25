// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  injectNavbar();
  injectFooter();
  initMobileMenu();
});

function injectNavbar() {
  // Create and prepend the high-end glassmorphism header node
  const header = document.createElement("header");
  header.className = "navbar";

  header.innerHTML = `
    <div class="nav-container">
      <a href="index.html" class="nav-brand">MOSES.OS</a>
      <button class="menu-toggle" aria-label="Toggle Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu">
        <li><a href="index.html" class="nav-link" data-path="index.html">Home</a></li>
        <li><a href="about.html" class="nav-link" data-path="about.html">About</a></li>
        <li><a href="projects.html" class="nav-link" data-path="projects.html">Projects</a></li>
        <li><a href="planner.html" class="nav-link" data-path="planner.html">Planner</a></li>
        <li><a href="contact.html" class="nav-link" data-path="contact.html">Contact</a></li>
      </ul>
    </div>
  `;

  document.body.insertBefore(header, document.body.firstChild);

  // Dynamically inject the hidden interaction overlay sibling
  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.insertBefore(overlay, header.nextSibling);

  setActiveNavLink();
}

function injectFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-meta">
        <span>&copy; 2026 </span>
        <span class="footer-meta-identity">Moses</span>
        <span> // Miva Open University // COS 106 Project</span>
      </div>
      <ul class="footer-links">
        <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" class="footer-link">[GitHub]</a></li>
        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-link">[LinkedIn]</a></li>
        <li><a href="mailto:miva@miva.edu.ng" class="footer-link">[Email]</a></li>
      </ul>
    </div>
  `;

  document.body.appendChild(footer);
}

function setActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("data-path") === currentPath) {
      link.classList.add("active");
    }
  });
}

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  const overlay = document.querySelector(".nav-overlay");
  const body = document.body;

  if (toggle && menu && overlay) {
    // Single gate-keeper to handle synchronized state modifications
    const closeMenu = () => {
      menu.classList.remove("active");
      toggle.classList.remove("open");
      overlay.classList.remove("active");
      body.classList.remove("no-scroll");
    };

    const toggleMenu = () => {
      const isActivating = menu.classList.toggle("active");
      toggle.classList.toggle("open");
      overlay.classList.toggle("active");

      // Toggle body scroll control state
      if (isActivating) {
        body.classList.add("no-scroll");
      } else {
        body.classList.remove("no-scroll");
      }
    };

    // Event Bindings
    toggle.addEventListener("click", toggleMenu);

    // Clicking outside the navbar bounds (on the overlay plane) triggers clean breakdown
    overlay.addEventListener("click", closeMenu);

    // Auto-close menu array block if a routing link gets clicked
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
}
