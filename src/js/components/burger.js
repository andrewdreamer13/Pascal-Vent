export const initBurger = (btnSelector, menuSelector) => {
  const burger = document.querySelector(btnSelector);
  const menu = document.querySelector(menuSelector);
  const list = menu?.querySelector(".nav__list");
  const items = menu?.querySelectorAll(".nav__link");
  const firstItem = items?.[0];
  const lastItem = items?.[items.length - 1];
  const body = document.body;

  if (!burger || !menu || !items.length) return;

  const closeMenu = (restoreFocus = true) => {
    burger.classList.remove("is-active");
    menu.classList.remove("is-open");
    body.classList.remove("menu-open");
    document.documentElement.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");

    if (restoreFocus) {
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

    if (!isOpened) {
      setTimeout(() => {
        firstItem.focus();
      }, 350);
    }
  };

  burger.addEventListener("click", toggleMenu);

  // Focus trap
  menu.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      }
    } else {
      if (document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    }
  });

  // Navigation links
  menu.addEventListener("click", (e) => {
    const link = e.target.closest(".nav__link");

    if (!link) return;

    const target = document.querySelector(link.getAttribute("href"));

    setTimeout(() => {
      closeMenu(false); // не возвращаем фокус на бургер
      target?.focus();
    }, 300);
  });

  // Закрытие по клику в пустую область
  if (list) {
    list.addEventListener("click", (e) => {
      if (e.target === list) {
        closeMenu();
      }
    });
  }

  // Esc
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
//   const items = menu.querySelectorAll(".nav__link");
//   const firstItem = items[0];
//   const lastItem = items[items.length - 1];
//   const body = document.body;

//   if (!burger || !menu) return;

//   const closeMenu = () => {
//     burger.classList.remove("is-active");
//     menu.classList.remove("is-open");
//     body.classList.remove("menu-open");
//     document.documentElement.classList.remove("menu-open");
//     burger.setAttribute("aria-expanded", false);

//     burger.focus();
//   };

//   const toggleMenu = () => {
//     const isOpened = menu.classList.contains("is-open");

//     burger.classList.toggle("is-active");
//     menu.classList.toggle("is-open");
//     body.classList.toggle("menu-open");
//     document.documentElement.classList.toggle("menu-open");

//     burger.setAttribute("aria-expanded", !isOpened);

//     if (!isOpened) {
//       setTimeout(() => {
//         firstItem.focus();
//         console.log(document.activeElement);
//       }, 350);
//     }
//   };

//   burger.addEventListener("click", toggleMenu);

//   menu.addEventListener("keydown", (e) => {
//     if (e.key !== "Tab") return;

//     if (e.shiftKey) {
//       if (document.activeElement === firstItem) {
//         e.preventDefault();
//         lastItem.focus();
//       }
//     } else {
//       if (document.activeElement === lastItem) {
//         e.preventDefault();
//         firstItem.focus();
//         console.log("after focus", document.activeElement);

//         setTimeout(() => {
//           console.log("200ms later", document.activeElement);
//         }, 200);
//       }
//     }
//   });

//   menu.addEventListener("click", (e) => {
//     const link = e.target.closest("a");

//     if (link) {
//       const target = document.querySelector(link.getAttribute("href"));

//       setTimeout(() => {
//         closeMenu();
//         target?.focus();
//       }, 300);

//       return;
//     }

//     if (e.target.closest("button")) {
//       setTimeout(closeMenu, 300);
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
