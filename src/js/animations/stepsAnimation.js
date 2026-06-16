import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initStepsAnimation = () => {
  const stepsSection = document.querySelector(".steps");
  if (!stepsSection) return;

  const sectionTitleTexts = stepsSection.querySelectorAll(".title__text");
  sectionTitleTexts.forEach((item) => {
    const originalText = item.textContent;
    item.innerHTML = "";
    for (let char of originalText) {
      const span = document.createElement("span");
      span.textContent = char === " " || char === "\u00A0" ? "\u00A0" : char;
      item.append(span);
    }
  });

  const letters = stepsSection.querySelectorAll(".title__text span");
  const rowWithLine = stepsSection.querySelector(".title__row--with-line");

  const contentDesktop = stepsSection.querySelector(".steps__content--desktop");
  const contentMobile = stepsSection.querySelector(".steps__content--mobile");
  const vizItems = stepsSection.querySelectorAll(".steps__visualization-item");

  const getSvgElements = (wrapper) => {
    if (!wrapper) return null;
    const svg = wrapper.querySelector("svg");
    if (!svg) return null;

    return {
      svgTag: svg,
      circles: svg.querySelectorAll(".step-circle"),
      icons: svg.querySelectorAll(".step-icon"),
      lines: svg.querySelectorAll(".arrow-line"),
      heads: svg.querySelectorAll(".arrow-head"),
    };
  };

  const prepareArrows = (lines, heads) => {
    lines.forEach((line) => {
      const length = line.getTotalLength ? line.getTotalLength() : 200;
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
        autoAlpha: 0,
      });
    });
    if (heads.length) {
      gsap.set(heads, { autoAlpha: 0 });
    }
  };

  let mm = gsap.matchMedia();

  mm.add("(min-width: 1200px)", () => {
    const wrapper = document.getElementById("steps-desktop-wrapper");
    if (!wrapper) return;

    gsap.set(letters, { opacity: 0, y: 40 });
    if (contentDesktop) gsap.set(contentDesktop, { opacity: 0, y: -40 });
    if (vizItems.length) gsap.set(vizItems, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stepsSection,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });

    tl.to(
      letters,
      { duration: 1.1, opacity: 1, y: 0, stagger: 0.04, ease: "back.out(1.4)" },
      0,
    );
    if (rowWithLine)
      tl.to(
        rowWithLine,
        { "--line-scale": 1, duration: 1.2, ease: "back.out(1.5)" },
        0.4,
      );
    if (contentDesktop)
      tl.to(
        contentDesktop,
        { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" },
        0.3,
      );

    const checkDesktopSvg = () => {
      const el = getSvgElements(wrapper);
      if (el && el.circles.length) {
        gsap.set(el.circles, { opacity: 0 });
        gsap.set(el.icons, {
          opacity: 0,
          scale: 0,
          transformOrigin: "50% 50%",
        });
        prepareArrows(el.lines, el.heads);

        let time = 0.6;
        const totalSteps = Math.max(el.circles.length, el.icons.length);

        for (let i = 0; i < totalSteps; i++) {
          const circleDuration = 1.0;
          const lineDuration = 1.3;

          if (el.circles[i])
            tl.to(
              el.circles[i],
              { duration: circleDuration, opacity: 1, ease: "power2.out" },
              time,
            );
          if (el.icons[i])
            tl.to(
              el.icons[i],
              { duration: 0.6, opacity: 1, scale: 1, ease: "back.out(1.2)" },
              time + 0.2,
            );
          if (vizItems[i])
            tl.to(
              vizItems[i],
              { duration: 0.8, opacity: 1, ease: "power1.out" },
              time + 0.3,
            );

          if (el.lines[i]) {
            tl.to(
              el.lines[i],
              {
                duration: lineDuration,
                strokeDashoffset: 0,
                autoAlpha: 1,
                ease: "power1.inOut",
              },
              time,
            );
            if (el.heads[i]) {
              tl.to(
                el.heads[i],
                { duration: 0.2, autoAlpha: 1, ease: "power1.out" },
                time + lineDuration - 0.1,
              );
            }

            time += lineDuration;
          } else {
            time += circleDuration;
          }
        }

        if (el.lines[totalSteps]) {
          const finalLineDuration = 1.3;
          tl.to(
            el.lines[totalSteps],
            {
              duration: finalLineDuration,
              strokeDashoffset: 0,
              autoAlpha: 1,
              ease: "power1.inOut",
            },
            time,
          );
          if (el.heads[totalSteps]) {
            tl.to(
              el.heads[totalSteps],
              { duration: 0.2, autoAlpha: 1, ease: "power1.out" },
              time + finalLineDuration - 0.1,
            );
          }
        }
      } else {
        requestAnimationFrame(checkDesktopSvg);
      }
    };
    checkDesktopSvg();
  });

  mm.add("(min-width: 768px) and (max-width: 1199px)", () => {
    const wrapper = document.getElementById("steps-tablet-wrapper");
    if (!wrapper) return;

    gsap.set(letters, { opacity: 0, y: 35 });
    if (contentDesktop) gsap.set(contentDesktop, { opacity: 0, y: -35 });
    if (vizItems.length) gsap.set(vizItems, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stepsSection,
        start: "top 55%",
        toggleActions: "play none none none",
      },
    });

    tl.to(
      letters,
      { duration: 1.0, opacity: 1, y: 0, stagger: 0.03, ease: "back.out(1.3)" },
      0,
    );
    if (rowWithLine)
      tl.to(
        rowWithLine,
        { "--line-scale": 1, duration: 1.1, ease: "back.out(1.4)" },
        0.4,
      );
    if (contentDesktop)
      tl.to(
        contentDesktop,
        { duration: 0.7, opacity: 1, y: 0, ease: "power2.out" },
        0.25,
      );

    const checkTabletSvg = () => {
      const el = getSvgElements(wrapper);
      if (el && el.circles.length) {
        gsap.set(el.circles, { opacity: 0 });
        gsap.set(el.icons, {
          opacity: 0,
          scale: 0,
          transformOrigin: "50% 50%",
        });
        prepareArrows(el.lines, el.heads);

        let time = 0.5;
        const totalSteps = Math.max(el.circles.length, el.icons.length);

        for (let i = 0; i < totalSteps; i++) {
          const circleDuration = 1.0;
          const lineDuration = 1.3;

          if (el.circles[i])
            tl.to(
              el.circles[i],
              { duration: circleDuration, opacity: 1, ease: "power2.out" },
              time,
            );
          if (el.icons[i])
            tl.to(
              el.icons[i],
              { duration: 0.6, opacity: 1, scale: 1, ease: "back.out(1.2)" },
              time + 0.2,
            );
          if (vizItems[i])
            tl.to(
              vizItems[i],
              { duration: 0.8, opacity: 1, ease: "power1.out" },
              time + 0.3,
            );

          if (el.lines[i]) {
            tl.to(
              el.lines[i],
              {
                duration: lineDuration,
                strokeDashoffset: 0,
                autoAlpha: 1,
                ease: "power1.inOut",
              },
              time,
            );
            if (el.heads[i]) {
              tl.to(
                el.heads[i],
                { duration: 0.2, autoAlpha: 1, ease: "power1.out" },
                time + lineDuration - 0.1,
              );
            }
            time += lineDuration;
          } else {
            time += circleDuration;
          }
        }
        if (el.lines[totalSteps]) {
          const finalLineDuration = 1.3;
          tl.to(
            el.lines[totalSteps],
            {
              duration: finalLineDuration,
              strokeDashoffset: 0,
              autoAlpha: 1,
              ease: "power1.inOut",
            },
            time,
          );
          if (el.heads[totalSteps]) {
            tl.to(
              el.heads[totalSteps],
              { duration: 0.2, autoAlpha: 1, ease: "power1.out" },
              time + finalLineDuration - 0.1,
            );
          }
        }
      } else {
        requestAnimationFrame(checkTabletSvg);
      }
    };
    checkTabletSvg();
  });

  mm.add("(max-width: 767px)", () => {
    const wrapper = document.getElementById("steps-mobile-wrapper");
    if (!wrapper) return;

    const contentMobile = stepsSection.querySelector(".steps__content--mobile");

    gsap.set(letters, { opacity: 0, y: 30 });
    if (contentMobile) gsap.set(contentMobile, { opacity: 0, y: -30 });
    if (vizItems.length) gsap.set(vizItems, { opacity: 0 });

    const tlMobile = gsap.timeline({
      scrollTrigger: {
        trigger: stepsSection,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });

    tlMobile.to(
      letters,
      { duration: 1.0, opacity: 1, y: 0, stagger: 0.03, ease: "back.out(1.2)" },
      0,
    );
    if (rowWithLine)
      tlMobile.to(
        rowWithLine,
        { "--line-scale": 1, duration: 1.0, ease: "back.out(1.4)" },
        0.3,
      );

    const checkMobileSvg = () => {
      const el = getSvgElements(wrapper);
      if (el && el.circles.length) {
        gsap.set(el.circles, { opacity: 0 });
        gsap.set(el.icons, {
          opacity: 0,
          scale: 0,
          transformOrigin: "50% 50%",
        });
        prepareArrows(el.lines, el.heads);

        const tlMobileSvg = gsap.timeline({
          scrollTrigger: {
            trigger: el.svgTag,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        });

        let time = 0;
        const totalSteps = Math.max(el.circles.length, el.icons.length);

        for (let i = 0; i < totalSteps; i++) {
          const circleDuration = 1.0;
          const lineDuration = 1.3;

          if (el.circles[i])
            tlMobileSvg.to(
              el.circles[i],
              { duration: circleDuration, opacity: 1, ease: "power2.out" },
              time,
            );
          if (el.icons[i])
            tlMobileSvg.to(
              el.icons[i],
              { duration: 0.6, opacity: 1, scale: 1, ease: "back.out(1.2)" },
              time + 0.2,
            );
          if (vizItems[i])
            tlMobileSvg.to(
              vizItems[i],
              { duration: 0.8, opacity: 1, ease: "power1.out" },
              time + 0.3,
            );

          if (el.lines[i]) {
            tlMobileSvg.to(
              el.lines[i],
              {
                duration: lineDuration,
                strokeDashoffset: 0,
                autoAlpha: 1,
                ease: "power1.inOut",
              },
              time,
            );
            if (el.heads[i]) {
              tlMobileSvg.to(
                el.heads[i],
                { duration: 0.2, autoAlpha: 1, ease: "power1.out" },
                time + lineDuration - 0.1,
              );
            }
            time += lineDuration;
          } else {
            time += circleDuration;
          }
        }

        if (el.lines[totalSteps]) {
          const finalLineDuration = 1.3;
          tlMobileSvg.to(
            el.lines[totalSteps],
            {
              duration: finalLineDuration,
              strokeDashoffset: 0,
              autoAlpha: 1,
              ease: "power1.inOut",
            },
            time,
          );
          if (el.heads[totalSteps]) {
            tlMobileSvg.to(
              el.heads[totalSteps],
              { duration: 0.2, autoAlpha: 1, ease: "power1.out" },
              time + finalLineDuration - 0.1,
            );
          }
          time += finalLineDuration;
        }

        if (contentMobile) {
          tlMobileSvg.to(
            contentMobile,
            { duration: 0.7, opacity: 1, y: 0, ease: "power2.out" },
            time + 0.1,
          );
        }
      } else {
        requestAnimationFrame(checkMobileSvg);
      }
    };
    checkMobileSvg();
  });
};
