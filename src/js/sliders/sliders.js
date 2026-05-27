//  Swiper
import Swiper from "swiper/bundle";

export const initSliders = () => {
  const swiper = new Swiper(".hero__slider", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 2000,
    observer: true,
    observeParents: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    //   waitForTransition: false,
    // },
    pagination: {
      el: ".hero__pagination",
    },
    on: {
      transitionStart: function () {
        const paginationEl = document.querySelector(".hero__pagination");
        if (!paginationEl) return;

        const activeIndex = this.activeIndex;
        const bulletWidth = 20;
        const viewWidth = 60;

        let offset = viewWidth - (activeIndex * bulletWidth + bulletWidth);

        if (offset > 0) {
          offset = 0;
        }
        const bullets = paginationEl.querySelectorAll(
          ".swiper-pagination-bullet",
        );
        bullets.forEach((bullet) => {
          bullet.style.transform = `translateX(${offset}px)`;
        });
      },

      init: function () {
        setTimeout(() => {
          this.emit("transitionStart");
        }, 200);
      },
    },
  });

  const gallerySwiper = new Swiper(".projects__slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    // observer: true,
    // observeParents: true,
    centeredSlides: true,
    // loopAdditionalSlides: 4,
    slidesPerView: 1,
    spaceBetween: 20,

    breakpoints: {
      480: {
        slidesPerView: 1.3,
        spaceBetween: 20,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },

      900: {
        slidesPerView: 3,
        spaceBetween: 30,
      },

      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },

    navigation: {
      nextEl: ".slider-nav__button--next",
      prevEl: ".slider-nav__button--prev",
    },
  });
};
