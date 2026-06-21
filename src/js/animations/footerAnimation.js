import { gsap } from "gsap";

export const initFooterAnimation = () => {
  const footerInner = document.querySelector(".footer__inner");
  if (!footerInner) return;

  const logo = footerInner.querySelector(".footer__logo");
  const info = footerInner.querySelector(".footer__info");
  const contacts = footerInner.querySelector(".footer__contacts");
  const request = footerInner.querySelector(".footer__request");

  let mm = gsap.matchMedia();

  const resetStyles = () => {
    gsap.set([logo, info, contacts, request], { clearProps: "all" });
  };

  const animProps = {
    initial: { opacity: 0, y: 40, scale: 0.96 }, // Откуда начинаем (скрыты, опущены, чуть уменьшены)
    animate: { duration: 1.2, opacity: 1, y: 0, scale: 1, ease: "power3.out" }, // Куда летим
  };

  mm.add("(min-width: 1201px)", () => {
    resetStyles();
    gsap.set([logo, info, contacts, request], animProps.initial);

    const tl = gsap.timeline({ paused: true });

    if (logo) tl.to(logo, animProps.animate, 0.2);
    if (info) tl.to(info, animProps.animate, 0.5);
    if (contacts) tl.to(contacts, animProps.animate, 0.8);
    if (request) tl.to(request, animProps.animate, 1.1);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );

    observer.observe(footerInner);
    return () => observer.disconnect();
  });

  mm.add("(min-width: 769px) and (max-width: 1200px)", () => {
    resetStyles();
    gsap.set([logo, info, contacts, request], animProps.initial);

    const tlTop = gsap.timeline({ paused: true });
    if (logo) tlTop.to(logo, animProps.animate, 0.2);
    if (info) tlTop.to(info, animProps.animate, 0.5);

    const topObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tlTop.play();
          topObserver.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    topObserver.observe(footerInner);

    const elementsToObserve = [
      { el: contacts, delay: 0.2 },
      { el: request, delay: 0.2 },
    ];

    const observersList = [];

    elementsToObserve.forEach(({ el, delay }) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            gsap.to(el, { ...animProps.animate, delay });
            obs.disconnect();
          }
        },
        { rootMargin: "0px 0px -25% 0px" },
      );
      obs.observe(el);
      observersList.push(obs);
    });

    return () => {
      topObserver.disconnect();
      observersList.forEach((obs) => obs.disconnect());
    };
  });

  mm.add("(max-width: 768px)", () => {
    resetStyles();
    const elements = [logo, contacts, request, info];

    gsap.set(elements, { opacity: 0, y: 25 });

    const observersList = [];

    elements.forEach((el) => {
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            gsap.to(el, {
              duration: 0.8,
              opacity: 1,
              y: 0,
              ease: "power2.out",
            });
            obs.disconnect();
          }
        },
        { rootMargin: "0px 0px -25% 0px" },
      );

      obs.observe(el);
      observersList.push(obs);
    });

    return () => observersList.forEach((obs) => obs.disconnect());
  });
};
