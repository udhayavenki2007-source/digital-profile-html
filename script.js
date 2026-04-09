const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navPanel = document.getElementById("navPanel");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const revealItems = document.querySelectorAll(".reveal");
const sections = [...document.querySelectorAll("main section[id]")];

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
}

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const theme = body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("portfolio-theme", theme);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!activeLink) return;

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        activeLink.classList.add("active");
      }
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0.1,
  }
);

sections.forEach((section) => sectionObserver.observe(section));
