export const initHeader = () => {
  const header = document.querySelector(".header");
  const themeBtn = document.querySelector("#themeToggle");
  const hero = document.querySelector(".hero");
  const body = document.body;

  if (!header) return;

  let lastScrollY = window.scrollY;
  let heroHeight = 0;

  const updateHeroHeight = () => {
    if (hero) {
      heroHeight = hero.offsetHeight;
    } else {
      heroHeight = 200;
    }
  };

  updateHeroHeight();

  window.addEventListener("resize", updateHeroHeight);

  const handleScroll = () => {
    if (body.classList.contains("lock")) return;

    const currentScrollY = window.scrollY;
    if (currentScrollY < 0) return;
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;

    if (currentScrollY <= heroHeight) {
      header.classList.remove("header--sticky", "header--hidden");
    } else if (currentScrollY > lastScrollY && currentScrollY > heroHeight) {
      header.classList.add("header--hidden");
      header.classList.remove("header--sticky");
    } else if (currentScrollY < lastScrollY) {
      header.classList.remove("header--hidden");
      header.classList.add("header--sticky");
    }

    lastScrollY = currentScrollY;
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  window.addEventListener("scroll", handleScroll);
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
};
