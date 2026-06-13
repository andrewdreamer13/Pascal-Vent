import { gsap } from "gsap";

export const initTabs = () => {
  const tabsContainer = document.querySelector(".services__tabs-container");
  if (!tabsContainer) return;

  const tabButtons = tabsContainer.querySelectorAll(".services__tab-btn");
  const tabPanels = tabsContainer.querySelectorAll(
    ".services__tab-content-item",
  );

  tabsContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".services__tab-btn");
    if (!button || button.classList.contains("services__tab-btn--active"))
      return;

    const targetId = button.getAttribute("aria-controls");
    const targetPanel = tabsContainer.querySelector(`#${targetId}`);

    const currentPanel = tabsContainer.querySelector(
      ".services__tab-content-item--active",
    );

    tabButtons.forEach((btn) => {
      btn.classList.remove("services__tab-btn--active");
      btn.setAttribute("aria-selected", "false");
    });
    button.classList.add("services__tab-btn--active");
    button.setAttribute("aria-selected", "true");

    const fadeInNewPanel = (panel) => {
      if (!panel) return;

      panel.classList.add("services__tab-content-item--active");

      const listItems = panel.querySelectorAll(".services__list-item");
      const tabImg = panel.querySelector(".services__tab-img");

      gsap.set(panel, { opacity: 0 });
      if (listItems.length > 0) gsap.set(listItems, { opacity: 0, x: -20 });
      if (tabImg) gsap.set(tabImg, { opacity: 0, scale: 0.96 });

      const clickTl = gsap.timeline();

      clickTl.to(panel, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      if (tabImg) {
        clickTl.to(
          tabImg,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }

      if (listItems.length > 0) {
        clickTl.to(
          listItems,
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
    };

    if (currentPanel && currentPanel !== targetPanel) {
      gsap.to(currentPanel, {
        opacity: 0,
        duration: 0.25,
        ease: "power1.inOut",
        onComplete: () => {
          currentPanel.classList.remove("services__tab-content-item--active");

          fadeInNewPanel(targetPanel);
        },
      });
    } else if (!currentPanel) {
      fadeInNewPanel(targetPanel);
    }
  });
};
