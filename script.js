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
  const servers = document.querySelector("#servers");
  const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 64;
  const start = 0;
  const end = servers ? servers.offsetTop - headerHeight : scrollRange * 0.45;
  const rawTransition = end > start ? (window.scrollY - start) / (end - start) : 1;
  const transition = Math.max(0, Math.min(rawTransition, 1));
  const easedTransition = transition * transition * (3 - 2 * transition);

  background.style.setProperty("--background-blur", (easedTransition * 8).toFixed(2) + "px");
  background.style.setProperty("--background-opacity", (easedTransition * .9).toFixed(3));

  const mix = (to) => (255 + (to - 255) * easedTransition).toFixed(0);
  const mutedMix = (to) => (238 + (to - 238) * easedTransition).toFixed(0);
  const softMix = (to) => (221 + (to - 221) * easedTransition).toFixed(0);

  document.documentElement.style.setProperty("--dynamic-text", `${mix(24)} ${mix(33)} ${mix(25)}`);
  document.documentElement.style.setProperty("--dynamic-muted", `${mutedMix(66)} ${mutedMix(80)} ${mutedMix(71)}`);
  document.documentElement.style.setProperty("--dynamic-soft", `${softMix(83)} ${softMix(97)} ${softMix(88)}`);
  document.documentElement.style.setProperty("--text-shadow-alpha", (.42 * (1 - easedTransition)).toFixed(3));
}

window.addEventListener("scroll", updateBackgroundShade, { passive: true });
window.addEventListener("resize", updateBackgroundShade);
updateBackgroundShade();
