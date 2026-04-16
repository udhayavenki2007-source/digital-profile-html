const body = document.body;
const pageLoader = document.getElementById("pageLoader");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navPanel = document.getElementById("navPanel");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const revealItems = document.querySelectorAll(".reveal");
const sections = [...document.querySelectorAll("main section[id]")];
const typingText = document.getElementById("typingText");
const projectButtons = document.querySelectorAll(".project-details-btn");
const projectModal = document.getElementById("projectModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStack = document.getElementById("modalStack");
const modalLive = document.getElementById("modalLive");
const modalGithub = document.getElementById("modalGithub");
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const timeline = document.getElementById("timeline");
const particlesRoot = document.getElementById("particles");
const magneticItems = document.querySelectorAll(".magnetic");
const tiltCards = document.querySelectorAll(".tilt-card");

// Typing animation roles
const roles = ["Python Developer", "Web Developer", "Problem Solver"];

const projectData = {
  calculator: {
    category: "Frontend Project",
    title: "Web Calculator",
    description:
      "A responsive calculator interface built to practice clean UI architecture, intuitive layout composition, and JavaScript-based interaction handling.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    live: "https://udhayavenki2007-source.github.io/",
    github: "https://github.com/udhayavenki2007-source",
  },
  flame: {
    category: "IoT Project",
    title: "Flame Detection IoT System",
    description:
      "A hardware-based safety system using flame sensors, microcontrollers, and alert logic to identify risky fire conditions and respond quickly.",
    stack: ["Embedded C", "Arduino", "ESP32", "Sensors"],
    live: "https://github.com/udhayavenki2007-source",
    github: "https://github.com/udhayavenki2007-source",
  },
  portfolio: {
    category: "Personal Brand Project",
    title: "Portfolio Website",
    description:
      "A premium portfolio concept focused on recruiter-friendly storytelling, interactive sections, glassmorphism visuals, and polished responsive design.",
    stack: ["HTML", "CSS", "JavaScript", "UI Animation"],
    live: "https://udhayavenki2007-source.github.io/",
    github: "https://github.com/udhayavenki2007-source",
  },
};

body.classList.add("is-loading");

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

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!activeLink || !entry.isIntersecting) return;

      navLinks.forEach((link) => link.classList.remove("active"));
      activeLink.classList.add("active");
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0.2,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const bar = entry.target.querySelector("span[data-width]");
      if (bar) {
        bar.style.width = bar.dataset.width;
      }
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".skill-meter__track").forEach((track) => skillObserver.observe(track));

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timeline?.classList.add("is-active");
      }
    });
  },
  { threshold: 0.25 }
);

if (timeline) {
  timelineObserver.observe(timeline);
}

function startTypingAnimation(words, element) {
  if (!element) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = () => {
    const currentWord = words[wordIndex];
    element.textContent = currentWord.slice(0, charIndex);

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex += 1;
      setTimeout(tick, 90);
      return;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(tick, 1300);
      return;
    }

    if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(tick, 45);
      return;
    }

    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(tick, 180);
  };

  tick();
}

startTypingAnimation(roles, typingText);

// Generate subtle floating particles in the background
function createParticles() {
  if (!particlesRoot) return;

  const particleCount = window.innerWidth < 760 ? 14 : 24;
  particlesRoot.innerHTML = "";

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${10 + Math.random() * 12}s`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.opacity = `${0.15 + Math.random() * 0.35}`;
    particle.style.transform = `scale(${0.6 + Math.random()})`;
    particlesRoot.appendChild(particle);
  }
}

createParticles();
window.addEventListener("resize", createParticles);

// Populate and open the project details modal
function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project || !projectModal) return;

  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalLive.href = project.live;
  modalGithub.href = project.github;
  modalStack.innerHTML = project.stack.map((item) => `<span>${item}</span>`).join("");
  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProjectModal(button.dataset.project);
  });
});

modalClose?.addEventListener("click", closeProjectModal);
modalBackdrop?.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

function setFieldError(fieldName, message) {
  const input = document.getElementById(fieldName);
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (!input || !error) return;
  input.classList.toggle("is-invalid", Boolean(message));
  error.textContent = message;
}

// Basic client-side validation for the contact form
function validateContactForm(formData) {
  const errors = {};
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const message = formData.get("message").toString().trim();

  if (name.length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (message.length < 10) {
    errors.message = "Please enter at least 10 characters.";
  }

  return errors;
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formSuccess?.classList.remove("is-visible");

  const formData = new FormData(contactForm);
  const errors = validateContactForm(formData);

  ["name", "email", "message"].forEach((field) => {
    setFieldError(field, errors[field] || "");
  });

  if (Object.keys(errors).length > 0) return;

  contactForm.reset();
  formSuccess?.classList.add("is-visible");
  window.setTimeout(() => {
    formSuccess?.classList.remove("is-visible");
  }, 3200);
});

function updateScrollTopVisibility() {
  if (window.scrollY > 500) {
    scrollTopBtn?.classList.add("is-visible");
  } else {
    scrollTopBtn?.classList.remove("is-visible");
  }
}

window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${offsetX * 0.08}px, ${offsetY * 0.08}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

window.addEventListener("load", () => {
  pageLoader?.classList.add("is-hidden");
  body.classList.remove("is-loading");
});
