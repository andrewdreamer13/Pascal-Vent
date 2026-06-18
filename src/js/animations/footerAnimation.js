import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initFooterAnimation = () => {
  const footerSection = document.querySelector(".footer");
  if (!footerSection) return;

  const logo = footerSection.querySelector(".footer__logo");
  const info = footerSection.querySelector(".footer__info");
  const contacts = footerSection.querySelector(".footer__contacts");
  const request = footerSection.querySelector(".footer__request");
  const upButton = footerSection.querySelector(".footer__up-button");

  let mm = gsap.matchMedia();

  mm.add("(min-width: 1201px)", () => {
    gsap.set([logo, info, contacts, request], { opacity: 0, y: 15 });
    if (upButton) gsap.set(upButton, { opacity: 0, scale: 0.3 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerSection,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.to(
      [logo, info],
      { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" },
      0,
    )
      .to(
        contacts,
        { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" },
        0.15,
      )
      .to(
        request,
        { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" },
        0.3,
      );

    if (upButton) {
      tl.to(
        upButton,
        { duration: 0.5, opacity: 1, scale: 1, ease: "back.out(1.5)" },
        0.5,
      );
    }
  });

  mm.add("(max-width: 1200px)", () => {
    const blocks = [logo, contacts, request, info];

    blocks.forEach((block) => {
      if (!block) return;

      gsap.set(block, { opacity: 0, y: 15 });

      gsap.to(block, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: block,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    if (upButton) {
      gsap.set(upButton, { opacity: 0, scale: 0.3 });
      gsap.to(upButton, {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: footerSection,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }
  });
};
