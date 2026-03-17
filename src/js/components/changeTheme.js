export function changeTheme() {
  const changeThemeBtn = document.querySelector("#theme");
  if (!changeThemeBtn) return; // Surgical precision: проверка на существование

  changeThemeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    // Определяем текущую тему и переключаем на противоположную
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // 1. Меняем атрибут на <html> — это мгновенно перекрасит CSS переменные
    html.setAttribute("data-theme", newTheme);

    // 2. Сохраняем выбор в localStorage, чтобы после обновления всё осталось
    localStorage.setItem("theme", newTheme);
  });
}
