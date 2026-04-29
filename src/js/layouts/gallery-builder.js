import { galleries } from "../data/gallery-data.js";

const createSlideHTML = (img) => `
  <div class="gallery__slider-slide swiper-slide">
    <picture>
      <source srcset="${img.webp}" type="image/webp">
      <img class="gallery__slider-img" src="${img.jpg}" alt="${img.alt}" loading="lazy">
    </picture>
  </div>
`;

const buildGallery = (category) => {
  const wrapper = document.querySelector(".gallery__slider-track");
  const data = galleries[category];

  if (!wrapper) {
    console.error("Ошибка: Контейнер .gallery__slider-track не найден");
    return;
  }

  if (!data) {
    console.error(`Ошибка: Категория "${category}" не найдена в данных`);
    return;
  }

  wrapper.innerHTML = "";

  const slidesHTML = data.map((img) => createSlideHTML(img)).join("");

  wrapper.insertAdjacentHTML("afterbegin", slidesHTML);

  if (window.gallerySwiper) {
    window.gallerySwiper.update();
    window.gallerySwiper.slideTo(0, 0);
  }
  if (window.gallerySwiper.pagination) {
    window.gallerySwiper.pagination.render();
    window.gallerySwiper.pagination.update();
  }
};

export const initGalleryTriggers = () => {
  const cards = document.querySelectorAll('[data-modal="gallery"]');

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.galleryType;
      if (category) {
        buildGallery(category);
      }
    });
  });
};
