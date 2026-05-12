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
  gallerySwiper = new Swiper(".gallery__slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    initialSlide: 0,
    centeredSlides: true,
    roundLengths: true,

    // observer: true,
    // observeParents: true,
    // observeSlideChildren: true,

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
  // if (gallerySwiper) {
  //   gallerySwiper.destroy(true, false);
  //   gallerySwiper = null;
  // }

  wrapper.innerHTML = "";
  const slidesHTML = data.map((img) => createSlideHTML(img)).join("");
  wrapper.insertAdjacentHTML("afterbegin", slidesHTML);

 requestAnimationFrame(() => {
   initSwiper();
 });
};

export const closeGallery = () => {
  // if (gallerySwiper) {
  //   gallerySwiper.destroy(true, false);
  //   gallerySwiper = null;
  // }
  if (
    gallerySwiper &&
    typeof gallerySwiper.destroy === "function" &&
    !gallerySwiper.destroyed
  ) {
    gallerySwiper.destroy(true, true);
  }

  gallerySwiper = null;
 
};

