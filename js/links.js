// Select all nav items
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("main .section");

function removeActiveClasses() {
  navItems.forEach((item) => item.classList.remove("active"));
}

function scrollToSection(id) {
  const section = document.getElementById(id);

  if (section) {
    section.focus({ preventScroll: true }); // for accessibility focus without scroll to jump
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    removeActiveClasses();
    item.classList.add("active");
    scrollToSection(item.dataset.target);
  });
  // keyboard accessibility (Enter and Space keys)
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.click();
    }
  });
});

// Optionally highlight nav according to scroll position (nice UX)
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 70; // header height + margin
    if (pageYOffset >= sectionTop) {
      current = section.id;
    }
  });
  if (current) {
    removeActiveClasses();
    const activeNav = document.querySelector(
      `.nav-item[data-target="${current}"]`
    );
    if (activeNav) activeNav.classList.add("active");
  }
});

// Initialize first nav item as active
if (navItems.length > 0) navItems[0].classList.add("active");