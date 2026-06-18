import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initProjectsAnimation = () => {
  const projectsSection = document.querySelector(".projects");
  if (!projectsSection) return;

  const sectionTitleTexts = projectsSection.querySelectorAll(".title__text");
  sectionTitleTexts.forEach((item) => {
    const originalText = item.textContent;
    item.innerHTML = "";
    for (let char of originalText) {
      const span = document.createElement("span");
      span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
      item.append(span);
    }
  });

  const letters = projectsSection.querySelectorAll(".title__text span");
  const rowWithLine = projectsSection.querySelector(".title__row--with-line");
  const description = projectsSection.querySelector(".projects__description");
  const slider = projectsSection.querySelector(".projects__slider");
  const projectsContent = projectsSection.querySelector(".projects__content");

  let mm = gsap.matchMedia();

  mm.add("(min-width: 1101px)", () => {
    gsap.set(letters, { opacity: 0, y: 15 });
    if (description) gsap.set(description, { opacity: 0, y: -40 });
    if (slider) gsap.set(slider, { opacity: 0, y: 30 });
    if (projectsContent)
      gsap.set(projectsContent, { "--projects-bg-opacity": 0 }); // Скрываем фон в 0

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsSection,
        start: "top 55%",
        toggleActions: "play none none none",
      },
    });

    tl.to(
      letters,
      { duration: 1.1, opacity: 1, y: 0, stagger: 0.04, ease: "back.out(1.4)" },
      0,
    ).to(
      rowWithLine,
      { "--line-scale": 1, duration: 1.2, ease: "back.out(1.5)" },
      0.4,
    );

    if (description) {
      tl.to(
        description,
        { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" },
        0.3,
      );
    }

    if (slider) {
      tl.to(
        slider,
        { duration: 1.2, opacity: 1, y: 0, ease: "power2.out" },
        0.6,
      );
    }

    if (projectsContent) {
      tl.to(
        projectsContent,
        { "--projects-bg-opacity": 0.4, duration: 1.0, ease: "power1.out" },
        1.8,
      );
    }
  });

  mm.add("(max-width: 1100px)", () => {
    gsap.set(letters, { opacity: 0, y: 25 });
    if (description) gsap.set(description, { opacity: 0, y: -25 });
    if (slider) gsap.set(slider, { opacity: 0 });
    if (projectsContent)
      gsap.set(projectsContent, { "--projects-bg-opacity": 0 }); // Скрываем фон в 0

    const tlMobile = gsap.timeline({
      scrollTrigger: {
        trigger: projectsSection,
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });

    tlMobile
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
        { "--line-scale": 1, duration: 1.1, ease: "back.out(1.4)" },
        0.3,
      );

    if (description) {
      tlMobile.to(
        description,
        { duration: 0.7, opacity: 1, y: 0, ease: "power2.out" },
        0.25,
      );
    }

    if (slider) {
      tlMobile.to(
        slider,
        { duration: 1.0, opacity: 1, ease: "power1.out" },
        0.5,
      );
    }

    if (projectsContent) {
      tlMobile.to(
        projectsContent,
        { "--projects-bg-opacity": 0.4, duration: 0.8, ease: "power1.out" },
        1.5,
      );
    }
  });
};
