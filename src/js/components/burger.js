export const initBurger = (btnSelector, menuSelector) => {
  const burger = document.querySelector(btnSelector);
  const menu = document.querySelector(menuSelector);

  if (!burger || !menu) return;

  const list = menu.querySelector(".nav__list");
  const firstLink = menu.querySelector(".nav__link");
  const body = document.body;

  const closeMenu = (returnFocus = true) => {
    burger.classList.remove("is-active");
    menu.classList.remove("is-open");
    body.classList.remove("menu-open");
    document.documentElement.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");

    if (returnFocus) {
      burger.focus();
    }
  };

  const toggleMenu = () => {
    const isOpened = menu.classList.contains("is-open");

    burger.classList.toggle("is-active");
    menu.classList.toggle("is-open");
    body.classList.toggle("menu-open");
    document.documentElement.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", String(!isOpened));

   if (!isOpened && firstLink) {
     firstLink.focus();
     console.log("Синхронный фокус на:", document.activeElement);
   }
  };

  

  burger.addEventListener("click", toggleMenu);

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a") || e.target.closest("button")) {
      setTimeout(() => closeMenu(false), 300);
    }
  });

  if (list) {
    list.addEventListener("click", (e) => {
      if (e.target === list) {
        closeMenu();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });
};

// export const initBurger = (btnSelector, menuSelector) => {
//   const burger = document.querySelector(btnSelector);
//   const menu = document.querySelector(menuSelector);
//   const list = menu ? menu.querySelector(".nav__list") : null;
//   const items = menu.querySelectorAll(".nav__item");
//   const body = document.body;

//   if (!burger || !menu) return;

//   const closeMenu = () => {
//     burger.classList.remove("is-active");
//     menu.classList.remove("is-open");
//     body.classList.remove("menu-open");
//     document.documentElement.classList.remove("menu-open");
//     burger.setAttribute("aria-expanded", false);
//   };

//   const toggleMenu = () => {
//     const isOpened = menu.classList.contains("is-open");
//     burger.classList.toggle("is-active");
//     menu.classList.toggle("is-open");
//     body.classList.toggle("menu-open");
//     document.documentElement.classList.toggle("menu-open");
//     burger.setAttribute("aria-expanded", !isOpened);
//   };

//   burger.addEventListener("click", toggleMenu);

//   menu.addEventListener("click", (e) => {
//     if (e.target.closest("a") || e.target.closest("button")) {
//       setTimeout(closeMenu, 300);
//       return;
//     }
//   });

//   if (list) {
//     list.addEventListener("click", (e) => {
//       if (e.target === list) {
//         closeMenu();
//       }
//     });
//   }

//   window.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && menu.classList.contains("is-open")) {
//       closeMenu();
//     }
//   });
// };
