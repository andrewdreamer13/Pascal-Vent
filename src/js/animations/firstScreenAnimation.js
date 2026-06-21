


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initFirstScreenAnimation = () => {
  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const isMobileLayout = window.innerWidth <= 900;

  // 1. Разбиваем строки текста на буквы
  const titleTexts = hero.querySelectorAll(".hero__title-text");
  titleTexts.forEach((item) => {
    const originalText = item.textContent;
    item.innerHTML = "";
    for (let char of originalText) {
      const span = document.createElement("span");
      span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
      item.append(span);
    }
  });

  const titleLetters = hero.querySelectorAll(".hero__title-text span");
  const rowWithLine = hero.querySelector(".hero__title-row--with-line");
  console.log("НАШЛАСЬ ЛИ ЛИНИЯ?:", rowWithLine);

  const firstSlideBg =
    hero.querySelector(".hero__slide-bg") ||
    hero.querySelector(".swiper-slide img");
  const description = hero.querySelector(".hero__description");
  const contacts = hero.querySelectorAll(".hero__contact-item");
  const button = hero.querySelector(".hero__button");

  // === ЭТАП 1: ИНИЦИАЛИЗАЦИЯ НАЧАЛЬНЫХ СОСТОЯНИЙ (Через стандартный gsap.set) ===
  gsap.set(titleLetters, { opacity: 0, x: isMobileLayout ? -15 : -25 });
  gsap.set(rowWithLine, { "--line-scale": 0 }); // Вот так же, как в твоем рабочем примере
  gsap.set(firstSlideBg, {
    scale: isMobileLayout ? 1.05 : 1.2,
    filter: isMobileLayout ? "none" : "blur(8px)",
  });
  gsap.set([description, button], { opacity: 0, y: isMobileLayout ? 15 : 25 });
  gsap.set(button, { scale: 0.95 });
  gsap.set(contacts, { opacity: 0, y: isMobileLayout ? 10 : 20 });
  gsap.set(header, { opacity: 0 });

  // === ЭТАП 2: ТАЙМЛАЙН АНИМАЦИИ ===
  // Делаем структуру один в один как в About, чтобы GSAP корректно подхватил кастомное свойство
  const tl = gsap.timeline();

  tl.to(
    firstSlideBg,
    {
      scale: 1,
      filter: "none",
      duration: isMobileLayout ? 1.2 : 2.0,
      ease: "power2.out",
    },
    0,
  ).to(
    titleLetters,
    {
      opacity: 1,
      x: 0,
      duration: isMobileLayout ? 0.9 : 1.1,
      stagger: isMobileLayout ? 0.02 : 0.04,
      ease: isMobileLayout ? "back.out(1.2)" : "back.out(1.4)",
    },
    0.2,
  );

  // Анимация линии — точь-в-точь как в твоем примере, без всяких хаков
  if (rowWithLine) {
    tl.to(
      rowWithLine,
      {
        "--line-scale": 1,
        duration: isMobileLayout ? 0.8 : 1.2,
        ease: isMobileLayout ? "back.out(1.2)" : "back.out(1.5)",
      },
      0.5,
    );
  }

  tl.to(
    description,
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    "-=0.5",
  )
    .to(
      contacts,
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
      "-=0.4",
    )
    .to(
      button,
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" },
      "-=0.3",
    )
    .to(
      header,
      {
        opacity: 1,
        duration: 0.6,
        ease: "linear",
      },
      "-=0.2",
    );
};
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const initFirstScreenAnimation = () => {
//   const header = document.querySelector(".header");
//   const hero = document.querySelector(".hero");
//   if (!hero) return;

//   const isMobileLayout = window.innerWidth <= 900;

//   // Разбираем строки на буквы
//   const titleRows = hero.querySelectorAll(".hero__title-text");
//   titleRows.forEach((item) => {
//     const originalText = item.textContent;
//     item.innerHTML = "";
//     for (let char of originalText) {
//       const span = document.createElement("span");
//       span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
//       item.append(span);
//     }
//   });


//   const titleLetters = hero.querySelectorAll(".hero__title-text span");

//   // Находим строку с линией в главном экране
//   const rowWithLine = hero.querySelector(".hero__title-row--with-line");

//   const firstSlideBg =
//     hero.querySelector(".hero__slide-bg") ||
//     hero.querySelector(".swiper-slide img");
//   const description = hero.querySelector(".hero__description");
//   const contacts = hero.querySelectorAll(".hero__contact-item");
//   const button = hero.querySelector(".hero__button");

//   const tl = gsap.timeline();

//   // === ЭТАП 1: МГНОВЕННОЕ ПРЯТАНИЕ ===
//   tl.set(titleLetters, {
//     opacity: 0,
//     x: isMobileLayout ? -15 : -25,
//     y: 0,
//   })
//     // На всякий случай сбрасываем переменную линии в 0 перед стартом
//     .set(rowWithLine, { "--line-scale": 0 })
//     .set(firstSlideBg, {
//       scale: isMobileLayout ? 1.05 : 1.2,
//       filter: isMobileLayout ? "none" : "blur(8px)",
//     })
//     .set([description, button], { opacity: 0, y: isMobileLayout ? 15 : 25 })
//     .set(button, { scale: 0.95 })
//     .set(contacts, { opacity: 0, y: isMobileLayout ? 10 : 20 })
//     .set(header, { opacity: 0 });

//   // === ЭТАП 2: ХОРЕОГРАФИЯ ===
//   tl
//     // 1. Слайдер
//     .to(
//       firstSlideBg,
//       {
//         scale: 1,
//         filter: "none",
//         duration: isMobileLayout ? 1.2 : 2.0,
//         ease: "power2.out",
//       },
//       0,
//     )

//     // 2. Буквы заголовка
//     .to(
//       titleLetters,
//       {
//         opacity: 1,
//         x: 0,
//         duration: isMobileLayout ? 0.9 : 1.1,
//         stagger: isMobileLayout ? 0.02 : 0.04,
//         ease: isMobileLayout ? "back.out(1.2)" : "back.out(1.4)",
//       },
//       0.2,
//     );

//   // 3. ТВОЯ ЛИНИЯ: Анимируем CSS-переменную псевдоэлемента
//   if (rowWithLine) {
//     tl.to(
//       rowWithLine,
//       {
//         "--line-scale": 1,
//         duration: isMobileLayout ? 0.8 : 1.2,
//         ease: isMobileLayout ? "back.out(1.2)" : "back.out(1.5)",
//       },
//       0.5, // Стартует в середине анимации букв, создавая красивый нахлест
//     );
//   }

//   tl
//     // 4. Контент под заголовком
//     .to(
//       description,
//       { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
//       "-=0.5",
//     )
//     .to(
//       contacts,
//       { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
//       "-=0.4",
//     )
//     .to(
//       button,
//       { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" },
//       "-=0.3",
//     )

//     // 5. Хедер
//     .to(
//       header,
//       {
//         opacity: 1,
//         duration: 0.6,
//         ease: "linear",
//       },
//       "-=0.2",
//     );
// };


// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const initFirstScreenAnimation = () => {
//   const header = document.querySelector(".header");
//   const hero = document.querySelector(".hero");
//   if (!hero) return;

//   const titleRows = hero.querySelectorAll(".hero__title-row");
//   const description = hero.querySelector(".hero__description");
//   const contacts = hero.querySelectorAll(".hero__contact-item");
//   const button = hero.querySelector(".hero__button");

//   const logo = header?.querySelector(".header__logo");
//   const navItems = header?.querySelectorAll(".nav__item");
//   const headerActions = header?.querySelector(".header__actions")?.children;

//   const tl = gsap.timeline();

//   // STAGE 1: Мгновенно прячем элементы в секунду 0 (чтобы не было мелькания)
//   tl.set(titleRows, {
//     opacity: 0,
//     y: 25,
//     skewY: 2,
//     transformOrigin: "left center",
//   })
//     .set([description, button], { opacity: 0 })
//     .set(button, { scale: 0.95 })
//     .set(contacts, { opacity: 0, y: 15 })
//     .set([logo, headerActions], { opacity: 0, y: -15 });

//   if (window.innerWidth > 1200) {
//     tl.set(navItems, { opacity: 0, y: -15 });
//   }

//   // STAGE 2: Хореография, завязанная на тайминг прелоадера
//   tl
//     // Контент Hero стартует ровно на отметке 3.4 секунды от начала загрузки страницы
//     .to(
//       titleRows,
//       {
//         opacity: 1,
//         y: 0,
//         skewY: 0,
//         duration: 0.8,
//         stagger: 0.15,
//         ease: "power3.out",
//       },
//       0.5,
//     ) // <-- Абсолютная позиция в таймлайне (учитываем 3с ожидания + 0.4с растворения)

//     .to(description, { opacity: 1, duration: 0.6 }, "-=0.4")
//     .to(contacts, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
//     .to(
//       button,
//       { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
//       "-=0.2",
//     )

//     // Хедер
//     .to(
//       [logo, headerActions],
//       { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
//       "-=0.1",
//     );

//   if (window.innerWidth > 1200) {
//     tl.to(
//       navItems,
//       { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 },
//       "-=0.4",
//     );
//   }
// };

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const initFirstScreenAnimation = () => {
//   const header = document.querySelector(".header");
//   const hero = document.querySelector(".hero");
//   if (!hero) return;

//   const titleRows = hero.querySelectorAll(".hero__title-row");
//   const description = hero.querySelector(".hero__description");
//   const contacts = hero.querySelectorAll(".hero__contact-item");
//   const button = hero.querySelector(".hero__button");

//   const logo = header?.querySelector(".header__logo");
//   const navItems = header?.querySelectorAll(".nav__item");
//   const headerActions = header?.querySelector(".header__actions")?.children;

//   const tl = gsap.timeline();

//   // 1. НАЧАЛЬНОЕ СОСТОЯНИЕ (Вместо SCSS)
//   // Назначаем стартовые позиции мгновенно в нулевой секунде таймлайна
//   tl.set(titleRows, {
//     opacity: 0,
//     y: 20,
//     skewY: 2,
//     transformOrigin: "left center",
//   })
//     .set([description, button], { opacity: 0 })
//     .set(button, { scale: 0.95 })
//     .set(contacts, { opacity: 0, y: 10 })
//     .set([logo, headerActions], { opacity: 0, y: -10 });

//   if (window.innerWidth > 1200) {
//     tl.set(navItems, { opacity: 0, y: -10 });
//   }

//   // 2. САМА ХОРЕОГРАФИЯ (Движение к opacity: 1, y: 0, skewY: 0)
//   tl
//     // ЭТАП 1: HERO CONTENT
//     .to(
//       titleRows,
//       {
//         opacity: 1,
//         y: 0,
//         skewY: 0,
//         duration: 0.9,
//         stagger: 0.15,
//         ease: "power3.out",
//       },
//       0.3,
//     ) // Стартуем чуть позже, пока слайдер в движении

//     .to(description, { opacity: 1, duration: 0.6 }, "-=0.5")
//     .to(contacts, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.4")
//     .to(
//       button,
//       { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
//       "-=0.3",
//     )

//     // ЭТАП 2: HEADER
//     .to(
//       [logo, headerActions],
//       { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
//       "-=0.2",
//     );

//   if (window.innerWidth > 1200) {
//     tl.to(
//       navItems,
//       { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 },
//       "-=0.4",
//     );
//   }
// };
