import { gsap } from "gsap";

export const initClientsAnimation = () => {
  const clientsSection = document.querySelector(".clients");
  if (!clientsSection) return;

  const sectionTitleTexts = clientsSection.querySelectorAll(".title__text");
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

  const letters = clientsSection.querySelectorAll(".title__text span");
  const rowWithLine = clientsSection.querySelector(".title__row--with-line");
  const description = clientsSection.querySelector(".clients__description");
  const slider = clientsSection.querySelector(".clients__slider");

  let mm = gsap.matchMedia();

  const resetStyles = () => {
    gsap.set([letters, description, slider], { clearProps: "all" });
    if (rowWithLine) gsap.set(rowWithLine, { clearProps: "--line-scale" });
  };

  const sliderAnimProps = {
    initial: { opacity: 0, y: 40, scale: 0.96 },
    animate: { duration: 1.2, opacity: 1, y: 0, scale: 1, ease: "power3.out" },
  };

  mm.add("(min-width: 1201px)", () => {
    resetStyles();

    gsap.set(letters, { opacity: 0, y: 15 });
    if (description) gsap.set(description, { opacity: 0, y: -40 });
    if (slider) gsap.set(slider, sliderAnimProps.initial);

    const tl = gsap.timeline({ paused: true });

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
      tl.to(slider, sliderAnimProps.animate, 0.6);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );

    observer.observe(clientsSection);
    return () => observer.disconnect();
  });

  mm.add("(max-width: 1200px)", () => {
    resetStyles();

    gsap.set(letters, { opacity: 0, y: 25 });
    if (description) gsap.set(description, { opacity: 0, y: -25 });

    const tlMobile = gsap.timeline({ paused: true });
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

    const observerTop = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tlMobile.play();
          observerTop.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observerTop.observe(clientsSection);

    let observerSlider;
    if (slider) {
      gsap.set(slider, sliderAnimProps.initial);

      observerSlider = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            gsap.to(slider, sliderAnimProps.animate);
            observerSlider.disconnect();
          }
        },

        { rootMargin: "0px 0px -15% 0px" },
      );
      observerSlider.observe(slider);
    }

    return () => {
      observerTop.disconnect();
      if (observerSlider) observerSlider.disconnect();
    };
  });
};
