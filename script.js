// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navbar = document.getElementById("navbar");

if (navToggle && navbar) {
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });

  // Close nav when clicking a link (on mobile)
  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("open");
    });
  });
}

// Smooth scroll for in-page anchors (only for same-page navigation)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // Only handle if it's a same-page anchor (not cross-page like "../index.html#events")
    if (href.startsWith("#") && !href.includes("../") && !href.includes(".html")) {
      const targetId = href;
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });
});

// Handle hash navigation when page loads (for cross-page navigation)
// This ensures smooth scrolling when navigating from other pages with a hash
function scrollToHash() {
  if (window.location.hash) {
    const hash = window.location.hash;
    // Prevent default jump scroll
    window.scrollTo(0, 0);
    
    // Wait for page to fully render, then smooth scroll
    setTimeout(function() {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        // Get header height for offset
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 150);
  }
}

// Run on page load
window.addEventListener('load', scrollToHash);

// Also handle hash changes (in case hash is added after page load)
window.addEventListener('hashchange', function() {
  scrollToHash();
});

// Handle immediate hash on DOM ready (faster than load event)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scrollToHash);
} else {
  scrollToHash();
}

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// JotForm is now embedded directly in the HTML, so no custom form submission code is needed
// The form will handle submissions automatically through the embedded iframe