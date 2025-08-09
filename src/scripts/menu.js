document.querySelector(".hamburger")?.addEventListener("click", () => {
  const menuButton = document.querySelector(".hamburger");
  const nav = document.querySelector("#site-nav");
  if (!menuButton || !nav) return;

  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", expanded ? "false" : "true");
  nav.classList.toggle("expanded");
});

// Close menu on Escape or outside click
(() => {
  const menuButton = document.querySelector(".hamburger");
  const nav = document.querySelector("#site-nav");
  if (!menuButton || !nav) return;

  function closeMenu() {
    if (menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("expanded");
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (!nav.contains(target) && !menuButton.contains(target)) {
      closeMenu();
    }
  });
})();
