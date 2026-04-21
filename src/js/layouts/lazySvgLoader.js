export const initLazySvg = () => {
  const lazyContainers = document.querySelectorAll("[data-svg-receiver]");
  if (lazyContainers.length === 0) return;

  const options = {
    // Уменьшаем rootMargin до 50px, чтобы загрузка начиналась почти при входе в экран
    rootMargin: "50px 0px",
    threshold: 0.01,
  };

  const observer = new IntersectionObserver(async (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const container = entry.target;
        const id = container.dataset.svgId;
        const src = container.dataset.svgSrc; // Путь для тяжелых файлов

        // Сначала пробуем найти в template (для мелких иконок)
        const template = document.getElementById(id);

        try {
          if (
            template &&
            template.content &&
            template.innerHTML.trim() !== ""
          ) {
            // ВАРИАНТ 1: Обычный шаблон
            const clone = template.content.cloneNode(true);
            container.innerHTML = "";
            container.appendChild(clone);
            console.log(`SVG ${id} loaded from template`);
          } else if (src) {
            // ВАРИАНТ 2: Тяжелый файл через fetch (твои листья)
            const response = await fetch(src);
            if (!response.ok)
              throw new Error(`network error: ${response.status}`);
            const svgText = await response.text();
            container.innerHTML = svgText;
            console.log(`SVG ${id} loaded with fetch`);
          }

          container.classList.add("_is-loaded");
          observer.unobserve(container);
        } catch (error) {
          console.error(`Lazy loading error ${id}:`, error);
        }
      }
    }
  }, options);

  lazyContainers.forEach((container) => observer.observe(container));
};

