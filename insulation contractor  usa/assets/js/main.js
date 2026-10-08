(function () {
  "use strict";

  // ---------------------------
  // ✨ Hero Interactive Grid (Reusable)
  // ---------------------------
  function initHeroGrid() {
    const gridContainer = document.querySelector(".grid-container");
    const gridBoxes = document.querySelectorAll(".grid-box");

    if (!gridContainer || !gridBoxes.length) return;

    gridContainer.addEventListener("mousemove", function (e) {
      const rect = gridContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gridBoxes.forEach((box) => {
        const boxRect = box.getBoundingClientRect();
        const boxX = boxRect.left - rect.left + boxRect.width / 2;
        const boxY = boxRect.top - rect.top + boxRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(x - boxX, 2) + Math.pow(y - boxY, 2)
        );
        const maxDistance = 300;

        if (distance < maxDistance) {
          const intensity = 1 - distance / maxDistance;
          const opacity = 0.05 + intensity * 0.4;
          const glowOpacity = intensity * 0.3;

          box.style.borderColor = `rgba(244, 121, 32, ${opacity})`;
          box.style.background = `radial-gradient(circle at ${
            ((x - (boxRect.left - rect.left)) / boxRect.width) * 100
          }% ${
            ((y - (boxRect.top - rect.top)) / boxRect.height) * 100
          }%, rgba(244, 121, 32, ${glowOpacity}), transparent 70%)`;
        } else {
          box.style.borderColor = "rgba(255, 255, 255, 0.05)";
          box.style.background = "transparent";
        }
      });
    });

    gridContainer.addEventListener("mouseleave", function () {
      gridBoxes.forEach((box) => {
        box.style.borderColor = "rgba(255, 255, 255, 0.05)";
        box.style.background = "transparent";
      });
    });
  }

  // ---------------------------
  // ✨ Simple Hero Grid Glow (For other pages)
  // ---------------------------
  function initSimpleHeroGrid() {
    const heroGrids = document.querySelectorAll(".hero-grid-bg");

    heroGrids.forEach((hero) => {
      const canvas = document.createElement("canvas");
      canvas.className = "absolute inset-0 pointer-events-none";
      canvas.style.zIndex = "1";
      hero.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      let animationId;

      function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
      }

      resize();
      window.addEventListener("resize", resize);

      hero.addEventListener("mousemove", function (e) {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (animationId) cancelAnimationFrame(animationId);

        animationId = requestAnimationFrame(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
          gradient.addColorStop(0, "rgba(244, 121, 32, 0.15)");
          gradient.addColorStop(0.5, "rgba(244, 121, 32, 0.05)");
          gradient.addColorStop(1, "rgba(244, 121, 32, 0)");

          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
      });

      hero.addEventListener("mouseleave", function () {
        if (animationId) cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    });
  }

  // ---------------------------
  // 🧭 Navbar & Sidebar Logic
  // ---------------------------
  function initNavbar() {
    const navbarToggler = document.getElementById("navbarToggler");
    const sidebarClose = document.getElementById("sidebarClose");
    const navbarCollapse = document.getElementById("navbarCollapse");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const nav = document.querySelector("nav");

    function openSidebar() {
      if (window.innerWidth < 1024) {
        navbarCollapse?.classList.remove("translate-x-full");
        nav?.setAttribute("data-state", "active");

        if (sidebarOverlay) {
          sidebarOverlay.style.visibility = "visible";
          sidebarOverlay.classList.remove("opacity-0");
        }

        document.body.style.overflow = "hidden";
      }
    }

    function closeSidebar() {
      if (window.innerWidth < 1024) {
        navbarCollapse?.classList.add("translate-x-full");
        nav?.setAttribute("data-state", "false");

        if (sidebarOverlay) {
          sidebarOverlay.classList.add("opacity-0");
          setTimeout(() => {
            sidebarOverlay.style.visibility = "hidden";
          }, 300);
        }

        document.body.style.overflow = "";
      }
    }

    navbarToggler?.addEventListener("click", openSidebar);
    sidebarClose?.addEventListener("click", closeSidebar);
    sidebarOverlay?.addEventListener("click", closeSidebar);
    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && closeSidebar()
    );

    const mobileAccordionTriggers = document.querySelectorAll(
      ".mobile-accordion-trigger"
    );
    mobileAccordionTriggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const accordionName = this.getAttribute("data-accordion");
        const content = document.querySelector(
          `[data-accordion-content="${accordionName}"]`
        );
        const arrow = this.querySelector(".mobile-accordion-arrow");

        if (content && arrow) {
          const isOpen =
            content.style.maxHeight && content.style.maxHeight !== "0px";

          document
            .querySelectorAll(".mobile-accordion-content")
            .forEach((el) => {
              el.style.maxHeight = "0px";
            });
          document.querySelectorAll(".mobile-accordion-arrow").forEach((a) => {
            a.classList.remove("rotate-180");
          });

          if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + "px";
            arrow.classList.add("rotate-180");
          }
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) {
        closeSidebar();
      }
    });
  }

  // Global FAQ toggle function for inline onclick handlers
  window.toggleFAQ = function toggleFAQ(button, index) {
    const faqItem = button.parentElement;
    const answer = document.getElementById(`faq-answer-${index}`);
    const icon = button.querySelector("svg");
    const isOpen = faqItem.classList.contains("open");

    // Close all others
    document.querySelectorAll("#faq .group.open").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("open");
        const otherAnswer = item.querySelector('[id^="faq-answer-"]');
        otherAnswer.style.maxHeight = "0";
        item.querySelector("svg").style.transform = "rotate(0deg)";
      }
    });

    // Toggle current
    if (isOpen) {
      faqItem.classList.remove("open");
      answer.style.maxHeight = "0";
      icon.style.transform = "rotate(0deg)";
    } else {
      faqItem.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.style.transform = "rotate(180deg)";
    }
  };

  // ---------------------------
  // 🚀 Initialize Everything
  // ---------------------------
  async function init() {
    initHeroGrid();
    initSimpleHeroGrid();

    setTimeout(initNavbar, 100);

    if (typeof sal === "function") {
      sal({
        once: true,
        threshold: 0.1,
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose functions globally if needed
  window.initNavbar = initNavbar;
  window.initHeroGrid = initHeroGrid;
  window.initSimpleHeroGrid = initSimpleHeroGrid;
})();
