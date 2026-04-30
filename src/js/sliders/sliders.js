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

  //   const gallerySwiper = new Swiper(".gallery__slider", {
  //     slidesPerView: 1,
  //     spaceBetween: 10,
  //     initialSlide: 0,
  //     // loop: true,
  //     observer: true,
  //     observeParents: true,
  //     observeSlideChildren: true,
  //     centeredSlides: true,
  //     roundLengths: true,

  //     pagination: {
  //       el: ".swiper-pagination",
  //       clickable: true,
  //     },
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //   });
};

//  slideChange: function () {
//         const swiperInstance = this;

//         window.requestAnimationFrame(() => {
//           const paginationEl = document.querySelector(".hero__pagination");
//           if (!paginationEl) return;

//           const activeIndex = swiperInstance.activeIndex;
//           const bulletWidth = 20; // 10px ширина + 10px суммарный margin
//           const viewWidth = 60; // Окно на 3 буллита

//           // Формула "Активный всегда справа":
//           let offset = viewWidth - (activeIndex * bulletWidth + bulletWidth);

//           // Ограничитель только для начала (чтобы первый буллит не улетал вправо)
//           if (offset > 0) offset = 0;

//           // ВНИМАНИЕ: Мы убрали проверку (offset < maxOffset),
//           // чтобы буллит НЕ уходил влево на последних слайдах.

//           const bullets = paginationEl.querySelectorAll(
//             ".swiper-pagination-bullet",
//           );
//           bullets.forEach((bullet) => {
//             // Применяем смещение. Если вдруг поедет не туда — убери минус перед offset
//             bullet.style.transform = `translateX(${-offset}px)`;
//           });
//         });
//       },
