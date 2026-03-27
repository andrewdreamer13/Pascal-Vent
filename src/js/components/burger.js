export const initBurger = (burgerSelector, menuSelector) => {
  const burger = document.querySelector(burgerSelector);
  const menu = document.querySelector(menuSelector);
  const body = document.body;

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    const isOpened = menu.classList.contains("is-open");

    burger.classList.toggle("is-active");
    menu.classList.toggle("is-open");
    body.classList.toggle("menu-open");

    burger.setAttribute("aria-expanded", !isOpened);
  });
};
