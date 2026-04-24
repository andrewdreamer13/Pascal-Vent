export const initLazySvg = () => {
  const lazyContainers = document.querySelectorAll("[data-svg-receiver]");
  if (lazyContainers.length === 0) return;

  const options = {
    rootMargin: "50px 0px",
    threshold: 0.01,
  };

  const observer = new IntersectionObserver(async (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const container = entry.target;
        const id = container.dataset.svgId;
        const src = container.dataset.svgSrc;
        const template = document.getElementById(id);

        try {
          if (
            template &&
            template.content &&
            template.innerHTML.trim() !== ""
          ) {
            const clone = template.content.cloneNode(true);
            container.innerHTML = "";
            container.appendChild(clone);
            console.log(`SVG ${id} loaded from template`);
          } else if (src) {
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
