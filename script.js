const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

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

const background = document.querySelector(".site-background");

function updateBackgroundShade() {
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? Math.min(window.scrollY / scrollRange, 1) : 0;

  background.style.setProperty("--background-middle", (.22 + progress * .28).toFixed(2));
  background.style.setProperty("--background-lower", (.58 + progress * .22).toFixed(2));
  background.style.setProperty("--background-bottom", (.82 + progress * .12).toFixed(2));
  background.style.opacity = (1 - progress * .9).toFixed(2);
}

window.addEventListener("scroll", updateBackgroundShade, { passive: true });
window.addEventListener("resize", updateBackgroundShade);
updateBackgroundShade();
