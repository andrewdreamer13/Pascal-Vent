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
    const targetPanel = document.getElementById(targetId);

    tabButtons.forEach((btn) => {
      btn.classList.remove("services__tab-btn--active");
      btn.setAttribute("aria-selected", "false");
    });

    tabPanels.forEach((panel) => {
      panel.classList.remove("services__tab-content-item--active");
    });

    button.classList.add("services__tab-btn--active");
    button.setAttribute("aria-selected", "true");

    if (targetPanel) {
      targetPanel.classList.add("services__tab-content-item--active");
    }
  });
};


