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

  
  mm.add("(min-width: 951px)", () => {
    gsap.set(letters, { opacity: 0, y: 15 });
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

    
    if (bgLung) {
      tl.to(bgLung, { duration: 2.8, opacity: 0.8, ease: "power2.in" }, 0);
    }
    if (bgLeaves) {
      tl.to(bgLeaves, { duration: 2.8, opacity: 1, ease: "power2.in" }, 0);
    }


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
  
  mm.add("(max-width: 950px)", () => {
    gsap.set(letters, { opacity: 0, y: 15 });
    gsap.set(bgLeaves, { opacity: 0 });
    gsap.set(allCards, { opacity: 0, x: 40 });

    const tlMobile = gsap.timeline({
      scrollTrigger: {
        trigger: installationSection,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });

    
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
