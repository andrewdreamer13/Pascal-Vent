export const initHeader = () => {
  const themeBtn = document.querySelector("#themeToggle");
  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");
  const body = document.body;

  if (!header) return;

 
  // let heroHeight = 0;

  // const updateHeroHeight = () => {
  //   if (hero) {
  //     heroHeight = hero.offsetHeight;
  //   } else {
  //     heroHeight = 200;
  //   }
  // };

  // updateHeroHeight();

  // window.addEventListener("resize", updateHeroHeight);

  

   let lastScrollY = window.scrollY;
   let ticking = false;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const threshold = 200;
    if (currentScrollY < 0) return;

    if (currentScrollY <= threshold) {
      header.classList.remove("header--sticky", "header--hidden");
    } else {
      if (
        currentScrollY > lastScrollY &&
        !header.classList.contains("header--hidden")
      ) {
        header.classList.add("header--hidden");
        header.classList.remove("header--sticky");
      }
      else if (
        currentScrollY < lastScrollY &&
        header.classList.contains("header--hidden")
      ) {
        header.classList.remove("header--hidden");
        header.classList.add("header--sticky");
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  //  window.addEventListener("scroll", handleScroll);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
};
