import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initAboutAnimation = () => {
  const aboutSection = document.querySelector(".about");
  if (!aboutSection) return;

 
  const sectionTitleTexts = aboutSection.querySelectorAll(".title__text");
  sectionTitleTexts.forEach((item) => {
    const originalText = item.textContent;
    item.innerHTML = "";
    for (let char of originalText) {
      const span = document.createElement("span");
      span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
      item.append(span);
    }
  });

  const letters = aboutSection.querySelectorAll(".title__text span");
  const rowWithLine = aboutSection.querySelector(".title__row--with-line");
  const featuresBox = aboutSection.querySelector(".about__features");
  const featuresBg = aboutSection.querySelector("#feature-bg-box");
  const featuresItems = aboutSection.querySelectorAll(".about__features-item");
  const advantagesContainer = aboutSection.querySelector(".about__advantages");
  const advantagesItems = aboutSection.querySelectorAll(
    ".about__advantages-item",
  );


  const advantagesBgs = aboutSection.querySelectorAll(
    ".about__advantages-item-bg .icon-wrapper",
  );

  let mm = gsap.matchMedia();

  
  mm.add("(min-width: 951px)", () => {
    gsap.set(letters, { opacity: 0, y: 40 });
    gsap.set(featuresBox, { opacity: 0, x: -30 });
    gsap.set(featuresBg, { opacity: 0, scale: 0.8 });
    gsap.set(featuresItems, { opacity: 0, y: 20 });
    gsap.set(advantagesItems, { opacity: 0, y: 40, scale: 0.95 });
    gsap.set(advantagesBgs, { opacity: 0, scale: 0.6 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
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
        featuresBox,
        { duration: 0.8, opacity: 1, x: 0, ease: "power2.out" },
        0.1,
      )
      .to(
        featuresBg,
        { duration: 1.0, opacity: 1, scale: 1, ease: "back.out(1.2)" },
        0.2,
      )
      .to(
        featuresItems,
        { duration: 0.8, opacity: 1, y: 0, stagger: 0.15, ease: "power2.out" },
        0.3,
      )
     
      .to(
        advantagesItems,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          ease: "power2.out",
        },
        0.4,
      )
    
      .to(advantagesBgs, {
        duration: 0.6,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        ease: "back.out(1.3)", 
      });

    if (rowWithLine) {
      tl.to(
        rowWithLine,
        { "--line-scale": 1, duration: 1.2, ease: "back.out(1.5)" },
        0.5,
      );
    }
  });

 
  mm.add("(max-width: 950px)", () => {
    gsap.set(letters, { opacity: 0, y: 30 });
    gsap.set(featuresBox, { opacity: 0, y: 30 });
    gsap.set(featuresBg, { opacity: 0, scale: 0.9 });
    gsap.set(featuresItems, { opacity: 0, y: 20 });
    gsap.set(advantagesItems, { opacity: 0, y: 30 });
    gsap.set(advantagesBgs, { opacity: 0, scale: 0.6 });

    const tlMobileText = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
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
        featuresBox,
        { duration: 0.7, opacity: 1, y: 0, ease: "power2.out" },
        0.1,
      )
      .to(
        featuresBg,
        { duration: 0.8, opacity: 1, scale: 1, ease: "power2.out" },
        0.2,
      )
      .to(
        featuresItems,
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

    
    if (advantagesContainer) {
      const tlMobileAdv = gsap.timeline({
        scrollTrigger: {
          trigger: advantagesContainer,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tlMobileAdv
        .to(advantagesItems, {
          duration: 0.8,
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "power2.out",
        })
        .to(advantagesBgs, {
          duration: 0.6,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          ease: "back.out(1.3)",
        });
    }
  });
};
