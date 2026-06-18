import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initComfortAnimation = () => {
  const comfortSection = document.querySelector(".comfort");
  if (!comfortSection) return;

  
  const sectionTitleTexts = comfortSection.querySelectorAll(".title__text");
  sectionTitleTexts.forEach((item) => {
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

  
  const textContent = [...infoItems, benefitsText, buttonBox].filter(Boolean);

  
  const galleryContainer = comfortSection.querySelector(".comfort__gallery");
  const images = comfortSection.querySelectorAll(".comfort__gallery-image");
  const galleryBg = comfortSection.querySelector(".comfort__gallery-bg");

  let mm = gsap.matchMedia();

  
  mm.add("(min-width: 1101px)", () => {
    gsap.set(letters, { opacity: 0, y: 15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: comfortSection,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });

    tl.to(
      letters,
      { duration: 1.1, opacity: 1, y: 0, stagger: 0.04, ease: "back.out(1.4)" },
      0,
    )
     
      .from(
        desktopIcons,
        {
          duration: 0.7,
          opacity: 0,
          y: 20,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.3,
      )
      
      .from(
        textContent,
        { duration: 0.7, opacity: 0, y: 20, stagger: 0.08, ease: "power2.out" },
        0.5,
      )
      
      .from(
        images,
        {
          duration: 1.6, 
          opacity: 0,
          y: 30, 
          stagger: 0.2,
          ease: "power4.out",
          force3D: true,
        },
        "-=0.4", 
      )
      
      .from(
        galleryBg,
        { duration: 1.2, opacity: 0, ease: "power2.out" },
        "-=0.4",
      );

    if (rowWithLine) {
      tl.to(
        rowWithLine,
        { "--line-scale": 1, duration: 1.2, ease: "back.out(1.5)" },
        0.5,
      );
    }
  });

  
  mm.add("(max-width: 1100px)", () => {
    gsap.set(letters, { opacity: 0, y: 15 });

    const tlMobileText = gsap.timeline({
      scrollTrigger: {
        trigger: comfortSection,
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
      
      .from(
        iconsContainer,
        { duration: 0.6, opacity: 0, y: 15, ease: "power2.out" },
        0.3,
      )
      .from(
        textContent,
        { duration: 0.7, opacity: 0, y: 20, stagger: 0.08, ease: "power2.out" },
        0.4,
      );

    if (rowWithLine) {
      tlMobileText.to(
        rowWithLine,
        { "--line-scale": 1, duration: 1.0, ease: "back.out(1.4)" },
        0.3,
      );
    }

    
    if (galleryContainer) {
      const tlMobileGallery = gsap.timeline({
        scrollTrigger: {
          trigger: galleryContainer,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tlMobileGallery
        .from(images, {
          duration: 0.9,
          opacity: 0,
          y: 25,
          stagger: 0.15,
          ease: "power3.out",
        })
        .from(
          galleryBg,
          { duration: 1.0, opacity: 0, ease: "power2.out" },
          "-=0.3",
        );
    }
  });
};
