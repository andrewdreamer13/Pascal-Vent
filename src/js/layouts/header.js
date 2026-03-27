export const initHeader = () => {
  const header = document.querySelector(".header");
  const themeBtn = document.querySelector("#themeToggle");
  const hero = document.querySelector(".hero");
  const body = document.body;

  if (!header) return;

  // Переменные для умного скролла
  let lastScrollY = window.scrollY;
  let heroHeight = 0;

  // Функция для динамического пересчета высоты Hero
  const updateHeroHeight = () => {
    if (hero) {
      heroHeight = hero.offsetHeight;
    } else {
      heroHeight = 200; // Фолбек, если секции hero вдруг нет
    }
  };

  // Инициализируем высоту при загрузке
  updateHeroHeight();

  // Обновляем высоту при ресайзе окна (динамика)
  window.addEventListener("resize", updateHeroHeight);

  // --- 2. Умная Sticky логика (Hide/Show) ---
  const handleScroll = () => {
    // Если открыто мобильное меню, не дергаем хедер при скролле (фикс для iOS/Android)
    if (body.classList.contains("menu-open")) return;

    const currentScrollY = window.scrollY;
    if (currentScrollY < 0) return;
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;

    // Сценарий А: Мы в самом верху (сбрасываем все классы)
    if (currentScrollY <= heroHeight) {
      header.classList.remove("header--sticky", "header--hidden");
    }
    // Сценарий Б: Скроллим ВНИЗ (прячем хедер)
    else if (currentScrollY > lastScrollY && currentScrollY > heroHeight) {
      header.classList.add("header--hidden");
      header.classList.remove("header--sticky");
    }
    // Сценарий В: Скроллим ВВЕРХ (показываем липкий хедер)
    else if (currentScrollY < lastScrollY) {
      header.classList.remove("header--hidden");
      header.classList.add("header--sticky");
    }

    lastScrollY = currentScrollY;
  };

  // --- 3. Логика Темы ---
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Инициализация темы при загрузке
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // --- Слушатели ---
  window.addEventListener("scroll", handleScroll);
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);


};
