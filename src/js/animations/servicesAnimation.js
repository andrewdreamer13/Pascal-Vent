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
    gsap.set(letters, { opacity: 0, y: 40 });
    gsap.set(descriptions, { opacity: 0, y: 30 });
    gsap.set(tabsContainer, { opacity: 0, y: -40 });

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

