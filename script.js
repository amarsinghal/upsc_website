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

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Contact form submission using JotForm
// IMPORTANT: Replace 'YOUR_JOTFORM_ID' with your actual JotForm form ID
// Get your free form ID at https://www.jotform.com
// After creating a form, go to Settings > Form Settings to find your Form ID
// Make sure your JotForm has fields named: name, email, and message (or update the field names below)
const JOTFORM_ID = 'https://form.jotform.com/253306144320040';
const JOTFORM_ENDPOINT = `https://submit.jotform.com/submit/${JOTFORM_ID}`;

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");

if (contactForm && submitBtn && formMessage) {
  // Create hidden iframe for form submission
  let iframe = document.createElement('iframe');
  iframe.name = 'jotform-iframe';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  
  // Set form action and target
  contactForm.action = JOTFORM_ENDPOINT;
  contactForm.target = 'jotform-iframe';
  contactForm.method = 'POST';
  
  // Listen for iframe load to detect submission success
  iframe.addEventListener('load', function() {
    try {
      // Check if submission was successful
      // JotForm returns a success page, so if iframe loaded, assume success
      formMessage.textContent = "Thank you! Your message has been sent successfully. We'll get back to you soon.";
      formMessage.className = "form-message success";
      formMessage.style.display = "block";
      contactForm.reset();
      
      // Scroll to message
      formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    } catch (e) {
      // Cross-origin restrictions may prevent reading iframe content
      // Assume success if iframe loaded
      formMessage.textContent = "Thank you! Your message has been sent successfully. We'll get back to you soon.";
      formMessage.className = "form-message success";
      formMessage.style.display = "block";
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
  
  contactForm.addEventListener("submit", (e) => {
    // Hide any previous messages
    formMessage.style.display = "none";
    
    // Validate form before submission
    if (!contactForm.checkValidity()) {
      e.preventDefault();
      formMessage.textContent = "Please fill in all required fields correctly.";
      formMessage.className = "form-message error";
      formMessage.style.display = "block";
      return;
    }
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    
    // Form will submit to iframe automatically
    // Success is handled by iframe load event
  });
}