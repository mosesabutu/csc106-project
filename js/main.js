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
      <a href="/" class="nav-brand">MOSES<span style="color: var(--primary);">.OS</span></a>
      <button class="menu-toggle" aria-label="Toggle Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu">
        <li><a href="/" class="nav-link" data-path="/">Home</a></li>
        <li><a href="/about" class="nav-link" data-path="/about">About</a></li>
        <li><a href="/project" class="nav-link" data-path="/project">Projects</a></li>
        <li><a href="/planner" class="nav-link" data-path="/planner">Planner</a></li>
        <li><a href="/contact" class="nav-link" data-path="/contact">Contact</a></li>
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
        <span> || Miva Open University || COS 106 Project</span>
      </div>
      <ul class="footer-links">
        <li><a href="https://github.com/mosesabutu/csc106-project" target="_blank" rel="noopener noreferrer" class="footer-link">[GitHub]</a></li>
        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-link">[LinkedIn]</a></li>
        <li><a href="mailto:m.abutu3785@miva.edu.ng" class="footer-link">[Email]</a></li>
      </ul>
    </div>
  `;

  document.body.appendChild(footer);
}

function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");
  console.log("Current Path:", window.location);
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("data-path");

    const isActive =
      currentPath === linkPath ||
      (currentPath === "/" && linkPath === "index.html");

    link.classList.toggle("active", isActive);
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
