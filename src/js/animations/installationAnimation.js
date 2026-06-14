import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const initInstallationAnimation = () => {
  const installationSection = document.querySelector(".installation");
  if (!installationSection) return;

  const titleTexts = installationSection.querySelectorAll(".title__text");
  titleTexts.forEach((item) => {
    const originalText = item.textContent;
    item.innerHTML = "";
    for (let char of originalText) {
      const span = document.createElement("span");
      span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
      item.append(span);
    }
  });

  const letters = installationSection.querySelectorAll(".title__text span");
  const rowWithLine = installationSection.querySelector(
    ".title__row--with-line",
  );
  const bgLung = installationSection.querySelector(".installation__bg-lung");
  const bgLeaves = installationSection.querySelector(
    ".installation__bg-leaves",
  );
  const allCards = installationSection.querySelectorAll(".installation__card");

  let mm = gsap.matchMedia();

  // 🖥️ ДЕСКТОП
  mm.add("(min-width: 951px)", () => {
    gsap.set(letters, { opacity: 0, y: 40 });
    gsap.set(bgLung, { opacity: 0 });
    gsap.set(bgLeaves, { opacity: 0 });
    gsap.set(allCards, { opacity: 0, x: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: installationSection,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });

    // === БЭКГРАУНД (Теперь растянут до 2.8s для максимальной плавности) ===
    if (bgLung) {
      tl.to(bgLung, { duration: 2.8, opacity: 0.8, ease: "power2.in" }, 0);
    }
    if (bgLeaves) {
      tl.to(bgLeaves, { duration: 2.8, opacity: 1, ease: "power2.in" }, 0);
    }

    // === КОНТЕНТ (Отрабатывает в своем идеальном темпе внутри окна бэкграунда) ===

    // Заголовок стартует чуть позже фона (в 0.2s)
    tl.to(
      letters,
      {
        duration: 1.0,
        opacity: 1,
        y: 0,
        stagger: 0.02,
        ease: "back.out(1.2)",
      },
      0.2,
    );

    // Линия подчеркивания (в 0.7s)
    if (rowWithLine) {
      tl.to(
        rowWithLine,
        {
          "--line-scale": 1,
          duration: 0.9,
          ease: "power2.out",
        },
        0.7,
      );
    }

    // Карточки вылетают веером (в 0.9s и полностью готовы к 1.8s)
    tl.to(
      allCards,
      {
        duration: 0.9,
        opacity: 1,
        x: 0,
        stagger: 0.07,
        ease: "power3.out",
      },
      0.9,
    );
  });
  // 📱 МОБИЛКИ
  mm.add("(max-width: 950px)", () => {
    gsap.set(letters, { opacity: 0, y: 30 });
    gsap.set(bgLeaves, { opacity: 0 });
    gsap.set(allCards, { opacity: 0, x: 40 });

    const tlMobile = gsap.timeline({
      scrollTrigger: {
        trigger: installationSection,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });

    // На мобилках листья тоже работают как длинная подложка
    if (bgLeaves) {
      tlMobile.to(
        bgLeaves,
        { duration: 1.5, opacity: 1, ease: "power1.inOut" },
        0,
      );
    }

    tlMobile.to(
      letters,
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.02,
        ease: "back.out(1.1)",
      },
      0.1,
    );

    if (rowWithLine) {
      tlMobile.to(
        rowWithLine,
        {
          "--line-scale": 1,
          duration: 0.7,
          ease: "power2.out",
        },
        0.4,
      );
    }

    tlMobile.to(
      allCards,
      {
        duration: 0.7,
        opacity: 1,
        x: 0,
        stagger: 0.05,
        ease: "power2.out",
      },
      0.5,
    );
  });
};;
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// export const initInstallationAnimation = () => {
//   const installationSection = document.querySelector(".installation");
//   if (!installationSection) return;

//   const titleTexts = installationSection.querySelectorAll(".title__text");
//   titleTexts.forEach((item) => {
//     const originalText = item.textContent;
//     item.innerHTML = "";
//     for (let char of originalText) {
//       const span = document.createElement("span");
//       span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
//       item.append(span);
//     }
//   });

//   const letters = installationSection.querySelectorAll(".title__text span");
//   const rowWithLine = installationSection.querySelector(
//     ".title__row--with-line",
//   );
//   const allCards = installationSection.querySelectorAll(".installation__card");

//   let mm = gsap.matchMedia();

//   // 🖥️ ДЕСКТОП (без лёгких и листьев)
//   mm.add("(min-width: 951px)", () => {
//     gsap.set(letters, { opacity: 0, y: 40 });
//     gsap.set(allCards, { opacity: 0, x: 50 });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: installationSection,
//         start: "top 50%",
//         toggleActions: "play none none none",
//       },
//     });

//     // 1. Посимвольный вылет заголовка
//     tl.to(
//       letters,
//       {
//         duration: 1.0,
//         opacity: 1,
//         y: 0,
//         stagger: 0.02,
//         ease: "back.out(1.4)",
//       },
//       0,
//     );

//     // 2. Декоративная линия (выезжает синхронно с финалом букв)
//     if (rowWithLine) {
//       tl.to(
//         rowWithLine,
//         {
//           "--line-scale": 1,
//           duration: 1.1,
//           ease: "back.out(1.2)",
//         },
//         "-=0.8", // Плотный нахлёст на заголовок
//       );
//     }

//     // 3. Выкатывание карточек (подхватывает движение линии)
//     tl.to(
//       allCards,
//       {
//         duration: 0.9,
//         opacity: 1,
//         x: 0,
//         stagger: 0.08, // Чуть увеличил шаг, чтобы они раскрывались «веером»
//         ease: "power3.out",
//       },
//       "-=0.7", // Появляются сразу за линией, формируя единый поток
//     );
//   });

//   // 📱 МОБИЛКИ (тоже убираем лишнее, оставляем только суть)
//   mm.add("(max-width: 950px)", () => {
//     gsap.set(letters, { opacity: 0, y: 30 });
//     gsap.set(allCards, { opacity: 0, x: 40 }); // Снизил вылет по X для мобилок, чтобы не было дергано

//     const tlMobile = gsap.timeline({
//       scrollTrigger: {
//         trigger: installationSection,
//         start: "top 60%", // Чуть опустил триггер для мобилок, чтобы анимация запускалась раньше
//         toggleActions: "play none none none",
//       },
//     });

//     tlMobile.to(
//       letters,
//       {
//         duration: 0.8,
//         opacity: 1,
//         y: 0,
//         stagger: 0.02,
//         ease: "back.out(1.2)",
//       },
//       0,
//     );

//     if (rowWithLine) {
//       tlMobile.to(
//         rowWithLine,
//         {
//           "--line-scale": 1,
//           duration: 0.8,
//           ease: "back.out(1.4)",
//         },
//         "-=0.5",
//       );
//     }

//     tlMobile.to(
//       allCards,
//       {
//         duration: 0.7,
//         opacity: 1,
//         x: 0,
//         stagger: 0.06,
//         ease: "power2.out",
//       },
//       "-=0.4",
//     );
//   });
// };

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// export const initInstallationAnimation = () => {
//   const installationSection = document.querySelector(".installation");
//   if (!installationSection) return;

//   const titleTexts = installationSection.querySelectorAll(".title__text");
//   titleTexts.forEach((item) => {
//     const originalText = item.textContent;
//     item.innerHTML = "";
//     for (let char of originalText) {
//       const span = document.createElement("span");
//       span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
//       item.append(span);
//     }
//   });

//   const letters = installationSection.querySelectorAll(".title__text span");
//   const rowWithLine = installationSection.querySelector(
//     ".title__row--with-line",
//   );
//   const bgLung = installationSection.querySelector(".installation__bg-lung");
//   const bgLeaves = installationSection.querySelector(
//     ".installation__bg-leaves",
//   );
//   const allCards = installationSection.querySelectorAll(".installation__card");

//   let mm = gsap.matchMedia();
//   mm.add("(min-width: 951px)", () => {
//     gsap.set(letters, { opacity: 0, y: 40 });
//     gsap.set(bgLung, { opacity: 0 });
//     gsap.set(bgLeaves, { opacity: 0 });
//     gsap.set(allCards, { opacity: 0, x: 50 });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: installationSection,
//         start: "top 50%",
//         toggleActions: "play none none none",
//       },
//     });

//     tl.to(
//       letters,
//       {
//         duration: 1.0,
//         opacity: 1,
//         y: 0,
//         stagger: 0.02,
//         ease: "back.out(1.4)",
//       },
//       0,
//     );

//     if (bgLung) {
//       tl.to(
//         bgLung,
//         {
//           duration: 1.3,
//           opacity: 0.8,
//           ease: "power2.out",
//         },
//         "-=0.6",
//       );
//     }

//     if (bgLeaves) {
//       tl.to(
//         bgLeaves,
//         {
//           duration: 1.3,
//           opacity: 1,
//           ease: "power2.out",
//         },
//         "-=0.9",
//       );
//     }

//     if (rowWithLine) {
//       tl.to(
//         rowWithLine,
//         {
//           "--line-scale": 1,
//           duration: 1.1,
//           ease: "back.out(1.2)",
//         },
//         "-=1.1",
//       );
//     }

//     tl.to(
//       allCards,
//       {
//         duration: 0.9,
//         opacity: 1,
//         x: 0,
//         stagger: 0.06,
//         ease: "power3.out",
//       },
//       "-=0.8",
//     );
//   });

//   mm.add("(max-width: 950px)", () => {
//     gsap.set(letters, { opacity: 0, y: 30 });
//     gsap.set(bgLeaves, { opacity: 0 });
//     gsap.set(allCards, { opacity: 0, x: 50 });

//     const tlMobile = gsap.timeline({
//       scrollTrigger: {
//         trigger: installationSection,
//         start: "top 50%",
//         toggleActions: "play none none none",
//       },
//     });

//     tlMobile.to(
//       letters,
//       { duration: 0.9, opacity: 1, y: 0, stagger: 0.02, ease: "back.out(1.2)" },
//       0,
//     );

//     if (rowWithLine) {
//       tlMobile.to(
//         rowWithLine,
//         { "--line-scale": 1, duration: 0.9, ease: "back.out(1.4)" },
//         "-=0.6",
//       );
//     }

//     if (bgLeaves) {
//       tlMobile.to(
//         bgLeaves,
//         { duration: 0.7, opacity: 1, ease: "power2.out" },
//         "-=0.5",
//       );
//     }

//     tlMobile.to(
//       allCards,
//       {
//         duration: 0.8,
//         opacity: 1,
//         x: 0,
//         stagger: 0.05,
//         ease: "power2.out",
//       },
//       "-=0.5",
//     );
//   });
// };;;
