const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const background = document.querySelector(".site-background");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
    });
  });
}

function updateProfileTheme() {
  if (!background) return;

  const work = document.querySelector("#work");
  const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 64;
  const threshold = work ? work.offsetTop - headerHeight : window.innerHeight * 0.55;
  const transition = window.scrollY >= threshold ? 1 : 0;

  background.style.setProperty("--background-blur", (transition * 8).toFixed(0) + "px");
  background.style.setProperty("--background-opacity", (transition * 0.9).toFixed(1));

  const text = transition ? "24 33 25" : "255 255 255";
  const muted = transition ? "66 80 71" : "238 243 239";
  const soft = transition ? "83 97 88" : "221 229 223";

  document.documentElement.style.setProperty("--dynamic-text", text);
  document.documentElement.style.setProperty("--dynamic-muted", muted);
  document.documentElement.style.setProperty("--dynamic-soft", soft);
  document.documentElement.style.setProperty("--text-shadow-alpha", transition ? "0" : "0.42");
}

window.addEventListener("scroll", updateProfileTheme, { passive: true });
window.addEventListener("resize", updateProfileTheme);
updateProfileTheme();
