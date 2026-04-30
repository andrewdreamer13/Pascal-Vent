import Swiper from "swiper/bundle";
import { galleries } from "../data/gallery-data.js";

const createSlideHTML = (img) => `
  <div class="gallery__slider-slide swiper-slide">
    <picture>
      <source srcset="${img.webp}" type="image/webp">
      <img class="gallery__slider-img" src="${img.jpg}" alt="${img.alt}" loading="lazy">
    </picture>
  </div>
`;

// Переменная для хранения экземпляра, чтобы иметь к ней доступ из любой функции в файле
let gallerySwiper = null;

/**
 * Инициализация слайдера.
 * Вызываем каждый раз при открытии категории.
 */
const initSwiper = () => {
  gallerySwiper = new Swiper(".gallery__slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    initialSlide: 0,
    centeredSlides: true,
    roundLengths: true,
    // Наблюдатели полезны для стабильности при динамической вставке
    observer: true,
    observeParents: true,
    observeSlideChildren: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

/**
 * Сборка галереи и перезапуск слайдера
 */
const buildGallery = (category) => {
  const wrapper = document.querySelector(".gallery__slider-track");
  const data = galleries[category];

  // 1. Проверки
  if (!wrapper) {
    console.error("Ошибка: Контейнер .gallery__slider-track не найден");
    return;
  }
  if (!data) {
    console.error(`Ошибка: Категория "${category}" не найдена в данных`);
    return;
  }

  // 2. Если слайдер уже существует (был открыт ранее), полностью удаляем его
  if (gallerySwiper) {
    // true, true — удаляем объект и все инлайновые стили Swiper
    gallerySwiper.destroy(true, true);
    gallerySwiper = null;
  }

  // 3. Очищаем старый HTML и вставляем новые слайды
  wrapper.innerHTML = "";
  const slidesHTML = data.map((img) => createSlideHTML(img)).join("");
  wrapper.insertAdjacentHTML("afterbegin", slidesHTML);

  // 4. Инициализируем Swiper с чистого листа
  // После вставки HTML слайдер увидит новые элементы и начнет с 0-го индекса
  initSwiper();
};

/**
 * Не забываем про функцию закрытия (вызывать при клике на крестик модалки)
 */
const closeGallery = () => {
  if (gallerySwiper) {
    gallerySwiper.destroy(true, true);
    gallerySwiper = null;
  }
  // Тут твой код скрытия модального окна, например:
  // document.querySelector('.modal').classList.remove('open');
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

// const buildGallery = (category) => {
//   const wrapper = document.querySelector(".gallery__slider-track");
//   const data = galleries[category];

//   if (!wrapper) {
//     console.error("Ошибка: Контейнер .gallery__slider-track не найден");
//     return;
//   }

//   if (!data) {
//     console.error(`Ошибка: Категория "${category}" не найдена в данных`);
//     return;
//   }

//   wrapper.innerHTML = "";

//   const slidesHTML = data.map((img) => createSlideHTML(img)).join("");

//   wrapper.insertAdjacentHTML("afterbegin", slidesHTML);

//   if (window.gallerySwiper) {
//     window.gallerySwiper.update();
//     window.gallerySwiper.slideTo(0, 0);
//   }
//   if (window.gallerySwiper.pagination) {
//     window.gallerySwiper.pagination.render();
//     window.gallerySwiper.pagination.update();
//   }
// };
