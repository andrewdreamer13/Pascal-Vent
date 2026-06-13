import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const initServicesAnimation = () => {
  const servicesSection = document.querySelector(".services");
  if (!servicesSection) return;

  const sectionTitleTexts = servicesSection.querySelectorAll(".title__text");
  sectionTitleTexts.forEach((item) => {
    const originalText = item.textContent;
    item.innerHTML = "";
    for (let char of originalText) {
      const span = document.createElement("span");
      span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
      item.append(span);
    }
  });

  const letters = servicesSection.querySelectorAll(".title__text span");
  const rowWithLine = servicesSection.querySelector(".title__row--with-line");
  const descriptions = servicesSection.querySelectorAll(".services__descr");
  const tabsContainer = servicesSection.querySelector(
    ".services__tabs-container",
  );

  let mm = gsap.matchMedia();

  mm.add("(min-width: 901px)", () => {
    // Задаем начальные состояния для ВСЕХ элементов секции
    gsap.set(letters, { opacity: 0, y: 40 });
    gsap.set(descriptions, { opacity: 0, y: 30 });
    gsap.set(tabsContainer, { opacity: 0, y: -40 }); // Наш любимый встречный снос

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesSection,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });

    tl.to(
      letters,
      { duration: 1.1, opacity: 1, y: 0, stagger: 0.04, ease: "back.out(1.4)" },
      0,
    )
      .to(
        descriptions,
        { duration: 0.8, opacity: 1, y: 0, stagger: 0.15, ease: "power2.out" },
        0.3,
      )
      .to(
        tabsContainer,
        { duration: 1.0, opacity: 1, y: 0, ease: "power2.out" },
        0.4,
      );

    if (rowWithLine) {
      tl.to(
        rowWithLine,
        { "--line-scale": 1, duration: 1.2, ease: "back.out(1.5)" },
        0.5,
      );
    }
  });

  mm.add("(max-width: 900px)", () => {
    gsap.set(letters, { opacity: 0, y: 30 });
    gsap.set(descriptions, { opacity: 0, y: 20 });
    gsap.set(tabsContainer, { opacity: 0, y: 30 }); 

    const tlMobileText = gsap.timeline({
      scrollTrigger: {
        trigger: servicesSection,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });

    tlMobileText
      .to(
        letters,
        {
          duration: 1.0,
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: "back.out(1.2)",
        },
        0,
      )
      .to(
        descriptions,
        { duration: 0.7, opacity: 1, y: 0, stagger: 0.1, ease: "power2.out" },
        0.2,
      );

    if (rowWithLine) {
      tlMobileText.to(
        rowWithLine,
        { "--line-scale": 1, duration: 1.0, ease: "back.out(1.4)" },
        0.3,
      );
    }

    gsap.to(tabsContainer, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: tabsContainer,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });
  });
};

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// export const initAppearance = () => {
//   const servicesSection = document.querySelector(".services");
//   if (!servicesSection) return;

//   // 1. Подготовка букв заголовка
//   const sectionTitleTexts = servicesSection.querySelectorAll(".title__text");
//   sectionTitleTexts.forEach((item) => {
//     const originalText = item.textContent;
//     item.innerHTML = "";
//     for (let char of originalText) {
//       const span = document.createElement("span");
//       span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
//       item.append(span);
//     }
//   });

//   const letters = servicesSection.querySelectorAll(".title__text span");
//   const rowWithLine = servicesSection.querySelector(".title__row--with-line");
//   const descriptions = servicesSection.querySelectorAll(".services__descr");
//   const tabsContainer = servicesSection.querySelector(
//     ".services__tabs-container",
//   );

//   // Создаем адаптивный медиа-запрос в GSAP
//   let mm = gsap.matchMedia();

//   // ДЕСКТОП (Экран больше 900px) — все блоки в один ряд, анимируем плотным каскадом
//   mm.add("(min-width: 901px)", () => {
//     gsap.set(letters, { opacity: 0, y: 40 });
//     gsap.set(descriptions, { opacity: 0, y: 30 });
//     gsap.set(tabsContainer, { opacity: 0, y: -40 }); // встречное движение сверху вниз

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: servicesSection,
//         start: "top 50%",
//         toggleActions: "play none none none",
//       },
//     });

//     tl.to(
//       letters,
//       { duration: 1.1, opacity: 1, y: 0, stagger: 0.04, ease: "back.out(1.4)" },
//       0,
//     )
//       .to(
//         descriptions,
//         { duration: 0.8, opacity: 1, y: 0, stagger: 0.15, ease: "power2.out" },
//         0.3,
//       )
//       .to(
//         tabsContainer,
//         { duration: 1.0, opacity: 1, y: 0, ease: "power2.out" },
//         0.4,
//       );

//     if (rowWithLine) {
//       tl.to(
//         rowWithLine,
//         { "--line-scale": 1, duration: 1.2, ease: "back.out(1.5)" },
//         0.5,
//       );
//     }
//   });

//   // МОБИЛКИ (Экран 900px и меньше) — блоки в колонку, разделяем триггеры
//   mm.add("(max-width: 900px)", () => {
//     // Начальные состояния
//     gsap.set(letters, { opacity: 0, y: 30 });
//     gsap.set(descriptions, { opacity: 0, y: 20 });
//     gsap.set(tabsContainer, { opacity: 0, y: 30 }); // на мобилке лучше пустить его ТОЖЕ снизу вверх, сверху падать ему некуда

//     // Первый триггер: для заголовка и текста
//     const tlText = gsap.timeline({
//       scrollTrigger: {
//         trigger: servicesSection,
//         start: "top 50%", // срабатывает, когда верхушка секции заходит в экран
//         toggleActions: "play none none none",
//       },
//     });

//     tlText
//       .to(
//         letters,
//         {
//           duration: 1.0,
//           opacity: 1,
//           y: 0,
//           stagger: 0.03,
//           ease: "back.out(1.2)",
//         },
//         0,
//       )
//       .to(
//         descriptions,
//         { duration: 0.7, opacity: 1, y: 0, stagger: 0.1, ease: "power2.out" },
//         0.2,
//       );

//     if (rowWithLine) {
//       tlText.to(
//         rowWithLine,
//         { "--line-scale": 1, duration: 1.0, ease: "back.out(1.4)" },
//         0.4,
//       );
//     }

//     // Второй триггер: ПЕРСОНАЛЬНО для табов, когда пользователь доскроллит до них
//     gsap.to(tabsContainer, {
//       duration: 0.8,
//       opacity: 1,
//       y: 0,
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: tabsContainer, // триггером становится сам контейнер табов
//         start: "top 50%", // сработает, когда табы покажутся снизу экрана
//         toggleActions: "play none none none",
//       },
//     });
//   });
// };

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// export const initAppearance = () => {
//   const servicesSection = document.querySelector(".services");
//   if (!servicesSection) return;

//   // 1. Подготовка букв заголовка
//   const sectionTitleTexts = servicesSection.querySelectorAll(".title__text");
//   sectionTitleTexts.forEach((item) => {
//     const originalText = item.textContent;
//     item.innerHTML = "";
//     for (let char of originalText) {
//       const span = document.createElement("span");
//       span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
//       item.append(span);
//     }
//   });

//   const letters = servicesSection.querySelectorAll(".title__text span");
//   const rowWithLine = servicesSection.querySelector(".title__row--with-line");
//   const descriptions = servicesSection.querySelectorAll(".services__descr");
//   const tabsContainer = servicesSection.querySelector(".services__tabs-container",);

//   // НАЧАЛЬНЫЕ СОСТОЯНИЯ
//   gsap.set(letters, { opacity: 0, y: 40 });

//   // Текст описания будет выплывать снизу вверх (y: 30)
//   gsap.set(descriptions, { opacity: 0, y: 30 });

//   // Весь блок таба целиком будет опускаться сверху вниз (y: -40)
//   gsap.set(tabsContainer, { opacity: 0, y: -40 });

//   // ЕДИНЫЙ ТАЙМЛАЙН
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: servicesSection,
//       start: "top 75%",
//       toggleActions: "play none none none",
//     },
//   });

//   // 0.0 сек — Стартуют буквы заголовка
//   tl.to(
//     letters,
//     {
//       duration: 1.1,
//       opacity: 1,
//       y: 0,
//       stagger: 0.04,
//       ease: "back.out(1.4)",
//     },
//     0,
//   );

//   // 0.3 сек — В разгаре анимации заголовка начинает выплывать текст снизу
//   tl.to(
//     descriptions,
//     {
//       duration: 0.8,
//       opacity: 1,
//       y: 0,
//       stagger: 0.15,
//       ease: "power2.out",
//     },
//     0.3,
//   );

//   // 0.4 сек — Правый блок плавно и весомо опускается сверху на своё место
//   tl.to(
//     tabsContainer,
//     {
//       duration: 1.0,
//       opacity: 1,
//       y: 0,
//       ease: "power2.out",
//     },
//     0.4,
//   );

//   // 0.5 сек — Доезжает линия в заголовке
//   if (rowWithLine) {
//     tl.to(
//       rowWithLine,
//       {
//         "--line-scale": 1,
//         duration: 1.2,
//         ease: "back.out(1.5)",
//       },
//       0.5,
//     );
//   }
// };
