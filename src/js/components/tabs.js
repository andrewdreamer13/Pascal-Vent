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



// export const initTabs = () => {
//   const tabsContainer = document.querySelector(".services__tabs-container");
//   if (!tabsContainer) return;

//   const tabButtons = tabsContainer.querySelectorAll(".services__tab-btn");
//   const tabPanels = tabsContainer.querySelectorAll(
//     ".services__tab-content-item",
//   );

//   tabsContainer.addEventListener("click", (e) => {
//     const button = e.target.closest(".services__tab-btn");

//     // Если кликнули не по кнопке или по уже активной — ничего не делаем
//     if (!button || button.classList.contains("services__tab-btn--active"))
//       return;

//     const targetId = button.getAttribute("aria-controls");
//     const targetPanel = document.getElementById(targetId);

//     // 1. Сначала находим те элементы, которые активны СЕЙЧАС
//     const currentActiveButton = tabsContainer.querySelector(
//       ".services__tab-btn--active",
//     );
//     const currentActivePanel = tabsContainer.querySelector(
//       ".services__tab-content-item--active",
//     );

//     // 2. ВКЛЮЧАЕМ новые элементы (теперь на странице ДВЕ активные панели на миг)
//     button.classList.add("services__tab-btn--active");
//     button.setAttribute("aria-selected", "true");
//     if (targetPanel) {
//       targetPanel.classList.add("services__tab-content-item--active");
//     }

//     // 3. ВЫКЛЮЧАЕМ старые элементы (страница не прыгает, так как новая панель уже в потоке)
//     if (currentActiveButton) {
//       currentActiveButton.classList.remove("services__tab-btn--active");
//       currentActiveButton.setAttribute("aria-selected", "false");
//     }
//     if (currentActivePanel) {
//       currentActivePanel.classList.remove("services__tab-content-item--active");
//     }
//   });
// };