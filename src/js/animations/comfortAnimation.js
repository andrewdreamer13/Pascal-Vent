import { gsap } from "gsap";

export const initComfortAnimation = () => {
  const comfortSection = document.querySelector(".comfort");
  if (!comfortSection) return;

  const sectionTitleTexts = comfortSection.querySelectorAll(".title__text");
  sectionTitleTexts.forEach((item) => {
    if (item.querySelector("span")) return;
    const originalText = item.textContent;
    item.innerHTML = "";
    for (let char of originalText) {
      const span = document.createElement("span");
      span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
      item.append(span);
    }
  });

  const letters = comfortSection.querySelectorAll(".title__text span");
  const rowWithLine = comfortSection.querySelector(".title__row--with-line");

  const iconsContainer = comfortSection.querySelector(
    ".comfort__benefits-icons",
  );
  const desktopIcons = comfortSection.querySelectorAll(
    ".comfort__benefits-icon:not(.comfort__benefits-icon--mob)",
  );

  const infoItems = comfortSection.querySelectorAll(
    ".comfort__benefits-info-item",
  );
  const benefitsText = comfortSection.querySelector(".comfort__benefits-text");
  const buttonBox = comfortSection.querySelector(".comfort__button-box");

  // Массив контентных элементов для раздельной анимации
  const textContent = [...infoItems, benefitsText, buttonBox].filter(Boolean);

  const galleryContainer = comfortSection.querySelector(".comfort__gallery");
  const images = comfortSection.querySelectorAll(".comfort__gallery-image");
  const galleryBg = comfortSection.querySelector(".comfort__gallery-bg");

  let mm = gsap.matchMedia();

  const resetStyles = () => {
    gsap.set([letters, desktopIcons, textContent, images, galleryBg], {
      clearProps: "all",
    });
    if (rowWithLine) gsap.set(rowWithLine, { clearProps: "--line-scale" });
  };

  // Премиальные настройки для вылета картинок и контента
  const premiumSmoothAnim = {
    initial: { opacity: 0, y: 35, scale: 0.97 },
    animate: { duration: 1.1, opacity: 1, y: 0, scale: 1, ease: "power3.out" },
  };

  // =========================================================================
  // 1. ДЕСКТОП (от 1101px) — Оставляем каскадный таймлайн
  // =========================================================================
  mm.add("(min-width: 1101px)", () => {
    resetStyles();

    gsap.set(letters, { opacity: 0, y: 15 });
    gsap.set(desktopIcons, { opacity: 0, y: 20 });
    gsap.set(textContent, { opacity: 0, y: 20 });
    gsap.set(images, premiumSmoothAnim.initial);
    if (galleryBg) gsap.set(galleryBg, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(
      letters,
      { duration: 1.1, opacity: 1, y: 0, stagger: 0.04, ease: "back.out(1.4)" },
      0,
    )
      .fromTo(
        desktopIcons,
        { opacity: 0, y: 20 },
        { duration: 0.7, opacity: 1, y: 0, stagger: 0.08, ease: "power2.out" },
        0.3,
      )
      .fromTo(
        textContent,
        { opacity: 0, y: 20 },
        { duration: 0.7, opacity: 1, y: 0, stagger: 0.08, ease: "power2.out" },
        0.5,
      )
      .to(images, { ...premiumSmoothAnim.animate, stagger: 0.15 }, 0.8);

    if (galleryBg) {
      tl.to(galleryBg, { duration: 1.2, opacity: 1, ease: "power2.out" }, 1.0);
    }
    if (rowWithLine) {
      tl.to(
        rowWithLine,
        { "--line-scale": 1, duration: 1.2, ease: "back.out(1.5)" },
        0.5,
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(comfortSection);

    return () => observer.disconnect();
  });

  // =========================================================================
  // 2. МОБИЛКИ И ПЛАНШЕТЫ (до 1100px) — Построчный независимый скролл контента
  // =========================================================================
  mm.add("(max-width: 1100px)", () => {
    resetStyles();

    const observersList = [];

    // А) Инициализируем верхушку (Заголовок + Контейнер иконок)
    gsap.set(letters, { opacity: 0, y: 15 });
    if (iconsContainer) gsap.set(iconsContainer, { opacity: 0, y: 15 });

    const tlMobileTop = gsap.timeline({ paused: true });
    tlMobileTop
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
        rowWithLine,
        { "--line-scale": 1, duration: 1.0, ease: "back.out(1.4)" },
        0.3,
      );

    if (iconsContainer) {
      tlMobileTop.to(
        iconsContainer,
        { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" },
        0.3,
      );
    }

    const topObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tlMobileTop.play();
          topObserver.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    topObserver.observe(comfortSection);
    observersList.push(topObserver);

    // Б) ВНИМАНИЕ: Анимируем нижние контентные элементы строго по мере доскролла к ним
    gsap.set(textContent, { opacity: 0, y: 25 });

    textContent.forEach((el) => {
      const contentObs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            gsap.to(el, {
              duration: 0.8,
              opacity: 1,
              y: 0,
              ease: "power2.out",
            });
            contentObs.disconnect();
          }
        },
        { rootMargin: "0px 0px -15% 0px" }, // Отработает вовремя, когда элемент покажется снизу
      );
      contentObs.observe(el);
      observersList.push(contentObs);
    });

    // В) Отдельный обсервер для мобильной галереи изображений
    if (galleryContainer) {
      gsap.set(images, premiumSmoothAnim.initial);
      if (galleryBg) gsap.set(galleryBg, { opacity: 0 });

      const galleryObs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const tlGallery = gsap.timeline();
            tlGallery
              .to(images, { ...premiumSmoothAnim.animate, stagger: 0.12 })
              .to(
                galleryBg,
                { duration: 1.0, opacity: 1, ease: "power2.out" },
                0.2,
              );
            galleryObs.disconnect();
          }
        },
        { rootMargin: "0px 0px -15% 0px" },
      );
      galleryObs.observe(galleryContainer);
      observersList.push(galleryObs);
    }

    // Чистим пачку обсерверов при изменении брейкпоинта
    return () => observersList.forEach((obs) => obs.disconnect());
  });
};

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export const initComfortAnimation = () => {
//   const comfortSection = document.querySelector(".comfort");
//   if (!comfortSection) return;

//   const sectionTitleTexts = comfortSection.querySelectorAll(".title__text");
//   sectionTitleTexts.forEach((item) => {
//     if (item.querySelector("span")) return;
//     const originalText = item.textContent;
//     item.innerHTML = "";
//     for (let char of originalText) {
//       const span = document.createElement("span");
//       span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
//       item.append(span);
//     }
//   });

//   const letters = comfortSection.querySelectorAll(".title__text span");
//   const rowWithLine = comfortSection.querySelector(".title__row--with-line");

//   const iconsContainer = comfortSection.querySelector(
//     ".comfort__benefits-icons",
//   );
//   const desktopIcons = comfortSection.querySelectorAll(
//     ".comfort__benefits-icon:not(.comfort__benefits-icon--mob)",
//   );
//   const infoItems = comfortSection.querySelectorAll(
//     ".comfort__benefits-info-item",
//   );
//   const benefitsText = comfortSection.querySelector(".comfort__benefits-text");
//   const buttonBox = comfortSection.querySelector(".comfort__button-box");

//   const textContent = [...infoItems, benefitsText, buttonBox].filter(Boolean);

//   const galleryContainer = comfortSection.querySelector(".comfort__gallery");
//   const images = comfortSection.querySelectorAll(".comfort__gallery-image");
//   const galleryBg = comfortSection.querySelector(".comfort__gallery-bg");

//   let mm = gsap.matchMedia();

//   mm.add("(min-width: 1101px)", () => {
//     gsap.set(letters, { opacity: 0, y: 15 });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: comfortSection,
//         start: "top 50%",
//         toggleActions: "play none none none",
//       },
//     });

//     tl.to(
//       letters,
//       { duration: 1.1, opacity: 1, y: 0, stagger: 0.04, ease: "back.out(1.4)" },
//       0,
//     )

//       .from(
//         desktopIcons,
//         {
//           duration: 0.7,
//           opacity: 0,
//           y: 20,
//           stagger: 0.08,
//           ease: "power2.out",
//         },
//         0.3,
//       )

//       .from(
//         textContent,
//         { duration: 0.7, opacity: 0, y: 20, stagger: 0.08, ease: "power2.out" },
//         0.5,
//       )

//       .from(
//         images,
//         {
//           duration: 1.6,
//           opacity: 0,
//           y: 30,
//           stagger: 0.2,
//           ease: "power4.out",
//           force3D: true,
//         },
//         "-=0.4",
//       )

//       .from(
//         galleryBg,
//         { duration: 1.2, opacity: 0, ease: "power2.out" },
//         "-=0.4",
//       );

//     if (rowWithLine) {
//       tl.to(
//         rowWithLine,
//         { "--line-scale": 1, duration: 1.2, ease: "back.out(1.5)" },
//         0.5,
//       );
//     }
//   });

//   mm.add("(max-width: 1100px)", () => {
//     gsap.set(letters, { opacity: 0, y: 15 });

//     const tlMobileText = gsap.timeline({
//       scrollTrigger: {
//         trigger: comfortSection,
//         start: "top 50%",
//         toggleActions: "play none none none",
//       },
//     });

//     tlMobileText
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

//       .from(
//         iconsContainer,
//         { duration: 0.6, opacity: 0, y: 15, ease: "power2.out" },
//         0.3,
//       )
//       .from(
//         textContent,
//         { duration: 0.7, opacity: 0, y: 20, stagger: 0.08, ease: "power2.out" },
//         0.4,
//       );

//     if (rowWithLine) {
//       tlMobileText.to(
//         rowWithLine,
//         { "--line-scale": 1, duration: 1.0, ease: "back.out(1.4)" },
//         0.3,
//       );
//     }

//     if (galleryContainer) {
//       const tlMobileGallery = gsap.timeline({
//         scrollTrigger: {
//           trigger: galleryContainer,
//           start: "top 75%",
//           toggleActions: "play none none none",
//         },
//       });

//       tlMobileGallery
//         .from(images, {
//           duration: 0.9,
//           opacity: 0,
//           y: 25,
//           stagger: 0.15,
//           ease: "power3.out",
//         })
//         .from(
//           galleryBg,
//           { duration: 1.0, opacity: 0, ease: "power2.out" },
//           "-=0.3",
//         );
//     }
//   });
// };
