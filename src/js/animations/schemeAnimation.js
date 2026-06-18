import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSchemeAnimation = () => {
  const schemeSection = document.querySelector(".scheme");
  if (!schemeSection) return;

  const sectionTitleTexts = schemeSection.querySelectorAll(".title__text");
  sectionTitleTexts.forEach((item) => {
    const originalText = item.textContent;
    item.innerHTML = "";
    for (let char of originalText) {
      const span = document.createElement("span");
      span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
      item.append(span);
    }
  });

  const letters = schemeSection.querySelectorAll(".title__text span");
  const rowWithLine = schemeSection.querySelector(".title__row--with-line");

  if (letters.length > 0) {
    gsap.set(letters, { opacity: 0, y: 15 });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scheme__title",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    titleTl.to(letters, {
      duration: 1.0,
      opacity: 1,
      y: 0,
      stagger: 0.03,
      ease: "back.out(1.2)",
    });

    if (rowWithLine) {
      titleTl.to(
        rowWithLine,
        {
          "--line-scale": 1,
          duration: 1.0,
          ease: "back.out(1.4)",
        },
        0.4,
      );
    }
  }

  const items = schemeSection.querySelectorAll(".scheme__item");
  let mm = gsap.matchMedia();

  const desktopLines = [
    ".scheme__flow-line--one",
    ".scheme__flow-line--two",
    ".scheme__flow-line--three",
    ".scheme__flow-line--four",
    ".scheme__flow-line--five",
  ];

  const tabletLines = [
    ".scheme__flow-line--tablet-1",
    ".scheme__flow-line--tablet-2",
    ".scheme__flow-line--tablet-3",
    ".scheme__flow-line--tablet-4",
    ".scheme__flow-line--tablet-5",
  ];

  const mobileLines = [
    ".scheme__flow-line--mobile-1",
    ".scheme__flow-line--mobile-2",
    ".scheme__flow-line--mobile-3",
    ".scheme__flow-line--mobile-4",
    ".scheme__flow-line--mobile-5",
  ];

  const buildScrubTimeline = (lineSelectors) => {
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scheme__list-wrapper",
        start: "top 65%",
        end: "bottom 80%",
        scrub: 1,
      },
    });

    const animateItemContent = (item, startTime) => {
      const itemTitle = item.querySelector(".scheme__item-title");
      const itemText = item.querySelector(".scheme__item-text");
      const itemBg = item.querySelector(".scheme__item-bg");

      mainTl.fromTo(
        [itemTitle, itemText],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" },
        startTime,
      );

      mainTl.fromTo(
        itemBg,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        startTime + 0.2,
      );
    };

    if (items[0]) {
      animateItemContent(items[0], 0);
    }

    lineSelectors.forEach((selector, index) => {
      const lineWrapper = schemeSection.querySelector(selector);
      const nextItem = items[index + 1];

      if (!lineWrapper) return;

      const path = lineWrapper.querySelector("path[class^='scheme__line']");
      const arrow = lineWrapper.querySelector("g[class^='arrow']");

      const lineStartTime = 0.4 + index * 1.0;
      const nextItemStartTime = lineStartTime + 0.66;

      if (path) {
        mainTl.to(
          path,
          { strokeDashoffset: 0, duration: 1.0, ease: "none" },
          lineStartTime,
        );
      }

      if (arrow) {
        gsap.set(arrow, { opacity: 0 });

        mainTl.to(arrow, { opacity: 1, duration: 0.1 }, lineStartTime);

        mainTl.fromTo(
          arrow,
          { offsetDistance: "0%" },
          { offsetDistance: "100%", duration: 1.0, ease: "none" },
          lineStartTime,
        );
      }

      if (nextItem) {
        animateItemContent(nextItem, nextItemStartTime);
      }
    });
  };

  mm.add("(min-width: 1025px)", () => {
    buildScrubTimeline(desktopLines);
  });

  mm.add("(max-width: 1024px) and (min-width: 769px)", () => {
    buildScrubTimeline(tabletLines);
  });

  mm.add("(max-width: 768px)", () => {
    buildScrubTimeline(mobileLines);
  });

  const signingTitle = schemeSection.querySelector(".scheme__signing-title");
  const signingBg = schemeSection.querySelector(".scheme__signing-bg");

  if (signingTitle || signingBg) {
    if (signingTitle) gsap.set(signingTitle, { opacity: 0, y: 20 });
    if (signingBg) gsap.set(signingBg, { opacity: 0, scale: 0.95 });

    const signingTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scheme__signing-title",
        start: "top 90%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    });

    if (signingTitle) {
      signingTl.to(signingTitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    if (signingBg) {
      signingTl.to(
        signingBg,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      );
    }
  }
};
