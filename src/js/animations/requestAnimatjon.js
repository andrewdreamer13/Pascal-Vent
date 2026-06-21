
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initRequestAnimation = () => {
  const requestSection = document.querySelector(".request");
  if (!requestSection) return;

  
  const sectionTitleTexts = requestSection.querySelectorAll(".title__text");
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

  const letters = requestSection.querySelectorAll(".title__text span");
  const rowWithLine = requestSection.querySelector(".title__row--with-line");

  
  const inputs = requestSection.querySelectorAll(".request__input-box");
  const submitBtn = requestSection.querySelector(".request__button");

  
  const staggerDelay = 0.04;
  const formStartOffset = Math.max(0, (letters.length - 4) * staggerDelay);

  
  gsap.set(letters, { opacity: 0, y: 15 });
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


