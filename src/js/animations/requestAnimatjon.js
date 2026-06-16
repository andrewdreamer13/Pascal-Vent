
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initRequestAnimation = () => {
  const requestSection = document.querySelector(".request");
  if (!requestSection) return;

  
  const sectionTitleTexts = requestSection.querySelectorAll(".title__text");
  sectionTitleTexts.forEach((item) => {
    const originalText = item.textContent;
    item.innerHTML = "";
    for (let char of originalText) {
      const span = document.createElement("span");
      span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
      item.append(span);
    }
  });

  const letters = requestSection.querySelectorAll(".title__text span");
  const rowWithLine = requestSection.querySelector(".title__row--with-line");

  
  const inputs = requestSection.querySelectorAll(".request__input-box");
  const submitBtn = requestSection.querySelector(".request__button");

  
  const staggerDelay = 0.04;
  const formStartOffset = Math.max(0, (letters.length - 4) * staggerDelay);

  
  gsap.set(letters, { opacity: 0, y: 35 });
  if (inputs.length) gsap.set(inputs, { opacity: 0, y: 25 });
  if (submitBtn) gsap.set(submitBtn, { opacity: 0, y: 25 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: requestSection,
      start: "top 45%",
      toggleActions: "play none none none",
    },
  });

  
  tl.to(
    letters,
    {
      duration: 1.0,
      opacity: 1,
      y: 0,
      stagger: staggerDelay,
      ease: "back.out(1.3)",
    },
    0,
  );

  
  if (inputs.length) {
    tl.to(
      inputs,
      { duration: 0.8, opacity: 1, y: 0, stagger: 0.15, ease: "power2.out" },
      formStartOffset,
    );
  }

  
  if (submitBtn) {
    tl.to(
      submitBtn,
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power2.out", 
      },
      "-=0.4", 
    );
  }

  if (rowWithLine) {
    tl.to(
      rowWithLine,
      { "--line-scale": 1, duration: 1.1, ease: "back.out(1.4)" },
      0.4,
    );
  }
};


// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const initRequestAnimation = () => {
//   const requestSection = document.querySelector(".request");
//   if (!requestSection) return;

//   // 1. Подготовка заголовка (разбиение на буквы)
//   const sectionTitleTexts = requestSection.querySelectorAll(".title__text");
//   sectionTitleTexts.forEach((item) => {
//     const originalText = item.textContent;
//     item.innerHTML = "";
//     for (let char of originalText) {
//       const span = document.createElement("span");
//       span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
//       item.append(span);
//     }
//   });

//   const letters = requestSection.querySelectorAll(".title__text span");
//   const rowWithLine = requestSection.querySelector(".title__row--with-line");

//   // Селекторы элементов формы
//   const formElements = requestSection.querySelectorAll(
//     ".request__input-box, .request__button",
//   );

//   // Считаем точную секунду старта для формы: когда осталось появиться последним 4 буквам
//   const staggerDelay = 0.04;
//   const formStartOffset = Math.max(0, (letters.length - 4) * staggerDelay);

//   // Начальное состояние (заголовок и форма притоплены вниз и скрыты)
//   gsap.set(letters, { opacity: 0, y: 35 });
//   gsap.set(formElements, { opacity: 0, y: 30 });

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: requestSection,
//       start: "top 60%", // оптимальная точка старта для всех экранов
//       toggleActions: "play none none none",
//     },
//   });

//   // Запуск анимации
//   tl.to(
//     letters,
//     {
//       duration: 1.0,
//       opacity: 1,
//       y: 0,
//       stagger: staggerDelay,
//       ease: "back.out(1.3)",
//     },
//     0,
//   ).to(
//     formElements,
//     { duration: 0.8, opacity: 1, y: 0, stagger: 0.15, ease: "power2.out" },
//     formStartOffset, // Форма плавно выходит снизу точно в тайминг букв
//   );

//   if (rowWithLine) {
//     tl.to(
//       rowWithLine,
//       { "--line-scale": 1, duration: 1.1, ease: "back.out(1.4)" },
//       0.4, // Линия подчеркивания плавно растягивается в процессе
//     );
//   }
// };

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const initRequestAnimation = () => {
//   const requestSection = document.querySelector(".request");
//   if (!requestSection) return;

//   // 1. Подготовка заголовка (по примеру из services)
//   const sectionTitleTexts = requestSection.querySelectorAll(".title__text");
//   sectionTitleTexts.forEach((item) => {
//     const originalText = item.textContent;
//     item.innerHTML = "";
//     for (let char of originalText) {
//       const span = document.createElement("span");
//       span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
//       item.append(span);
//     }
//   });

//   const letters = requestSection.querySelectorAll(".title__text span");
//   const rowWithLine = requestSection.querySelector(".title__row--with-line");

//   // 2. Селекторы элементов формы для сдвига справа налево
//   const formElements = requestSection.querySelectorAll(
//     ".request__input-box, .request__button",
//   );

//   let mm = gsap.matchMedia();

//   // Брейкпоинт Десктоп (от 901px)
//   mm.add("(min-width: 901px)", () => {
//     gsap.set(letters, { opacity: 0, y: 40 });
//     gsap.set(formElements, { opacity: 0, x: 40 }); // Начальная точка смещена вправо

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: requestSection,
//         start: "top 50%",
//         toggleActions: "play none none none",
//       },
//     });

//     tl.to(
//       letters,
//       { duration: 1.1, opacity: 1, y: 0, stagger: 0.04, ease: "back.out(1.4)" },
//       0,
//     ).to(
//       formElements,
//       { duration: 0.8, opacity: 1, x: 0, stagger: 0.15, ease: "power2.out" }, // Сдвиг справа налево
//       0.3,
//     );

//     if (rowWithLine) {
//       tl.to(
//         rowWithLine,
//         { "--line-scale": 1, duration: 1.2, ease: "back.out(1.5)" },
//         0.5,
//       );
//     }
//   });

//   // Брейкпоинт Мобильный (до 900px включительно)
//   mm.add("(max-width: 900px)", () => {
//     gsap.set(letters, { opacity: 0, y: 30 });
//     gsap.set(formElements, { opacity: 0, x: 25 }); // На мобилках сдвиг чуть меньше, чтобы не вылетало за экран

//     const tlMobile = gsap.timeline({
//       scrollTrigger: {
//         trigger: requestSection,
//         start: "top 50%",
//         toggleActions: "play none none none",
//       },
//     });

//     tlMobile
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
//         formElements,
//         { duration: 0.7, opacity: 1, x: 0, stagger: 0.12, ease: "power2.out" }, // Сдвиг справа налево
//         0.2,
//       );

//     if (rowWithLine) {
//       tlMobile.to(
//         rowWithLine,
//         { "--line-scale": 1, duration: 1.0, ease: "back.out(1.4)" },
//         0.3,
//       );
//     }
//   });
// };
