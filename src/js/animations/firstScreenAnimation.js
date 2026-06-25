import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initFirstScreenAnimation = () => {
  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const isMobileLayout = window.innerWidth <= 900;

  
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

  const firstSlideBg =
    hero.querySelector(".hero__slide-bg") ||
    hero.querySelector(".swiper-slide img");
  const description = hero.querySelector(".hero__description");
  const contacts = hero.querySelectorAll(".hero__contact-item");
  const button = hero.querySelector(".hero__button");

  
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
