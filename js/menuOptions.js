(function () {
    const menuIcon = document.getElementById("menu-icon");
    const bottomMenu = document.getElementById("head-links");
    const menuLinks = bottomMenu.querySelectorAll(".nav-item");

    // Toggle menu open/close
    function toggleMenu(open) {
      const isOpen = bottomMenu.classList.contains("active");
      if (typeof open === "boolean") {
        if (open === isOpen) return;
      }
      if (!isOpen) {
        bottomMenu.classList.add("active");
        menuIcon.classList.add("active");
        bottomMenu.setAttribute("aria-hidden", "false");
        menuIcon.setAttribute("aria-expanded", "true");
        // Make links focusable
        menuLinks.forEach((link) => (link.tabIndex = 0));
      } else {
        bottomMenu.classList.remove("active");
        menuIcon.classList.remove("active");
        bottomMenu.setAttribute("aria-hidden", "true");
        menuIcon.setAttribute("aria-expanded", "false");
        // Make links unfocusable
        menuLinks.forEach((link) => (link.tabIndex = -1));
        menuIcon.focus();
      }
    }

    menuIcon.addEventListener("click", () => {
      toggleMenu();
    });

    menuIcon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu on clicking a link and smooth scroll to the section
    menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);
            console.log(targetId);
        if (targetSection) {
            targetSection.style.scrollMargin = "50px"; // Adjust scroll margin for fixed header
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
        toggleMenu(false);
      });
    });

    // Initialize - menu closed and links unfocusable
    toggleMenu(false);
  })();