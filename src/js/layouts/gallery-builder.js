
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

let gallerySwiper = null;

const initSwiper = () => {
  const isDesktop = window.innerWidth > 768;

  gallerySwiper = new Swiper(".gallery__slider", {
    slidesPerView: 1,
    initialSlide: 0,
    roundLengths: true,
    centeredSlides: isDesktop,

    effect: isDesktop ? "fade" : "slide",
    fadeEffect: {
      crossFade: true,
    },

    // Настройки расстояния и скорости
    spaceBetween: isDesktop ? 0 : 10, // Для свайпа на мобилке нужен зазор, для фейда — нет
    speed: isDesktop ? 800 : 400, // На десктопе благородный фейд (800ms), на мобилке — шустрый свайп

    // На десктопе отключаем тач (мышкой фейд не потянешь), на мобилке — ЖЕЛЕЗНО включаем для пальца
    allowTouchMove: !isDesktop,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".gallery__button-next",
      prevEl: ".gallery__button-prev",
    },
  });
};

export const buildGallery = (category) => {
  const wrapper = document.querySelector(".gallery__slider-track");
  const data = galleries[category];

  if (!wrapper) {
    console.error("Error: container .gallery__slider-track is not found");
    return;
  }
  if (!data) {
    console.error(`Error:category "${category}" is not found in data`);
    return;
  }

  if (
    gallerySwiper &&
    typeof gallerySwiper.destroy === "function" &&
    !gallerySwiper.destroyed
  ) {
    gallerySwiper.destroy(true, true);
  }

  gallerySwiper = null;

  wrapper.innerHTML = "";
  const slidesHTML = data.map((img) => createSlideHTML(img)).join("");
  wrapper.insertAdjacentHTML("afterbegin", slidesHTML);

  requestAnimationFrame(() => {
    initSwiper();
  });
};

export const closeGallery = () => {
  if (
    gallerySwiper &&
    typeof gallerySwiper.destroy === "function" &&
    !gallerySwiper.destroyed
  ) {
    gallerySwiper.destroy(true, true);
  }

  gallerySwiper = null;
};


// const initSwiper = () => {
//   gallerySwiper = new Swiper(".gallery__slider", {
//     slidesPerView: 1,
//     spaceBetween: 10,
//     initialSlide: 0,
//     centeredSlides: true,
//     roundLengths: true,

//     effect: "fade",
//     fadeEffect: {
//       crossFade: true,
//     },

//     speed: 800,

//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     navigation: {
//       nextEl: ".gallery__button-next",
//       prevEl: ".gallery__button-prev",
//     },
//   });
// };