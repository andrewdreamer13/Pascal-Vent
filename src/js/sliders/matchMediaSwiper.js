import Swiper from "swiper/bundle";

// script for turning on swiper slider at pointed window width

export const initResizableSwiper = () => {
  const resizableSwiper = (
    breakpoint,
    swiperClass,
    swiperSettings,
    callback,
  ) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    };

    const checker = function () {
      if (breakpoint.matches) {
        // Создаем слайдер ТОЛЬКО если его еще нет
        if (swiper === undefined) {
          return enableSwiper(swiperClass, swiperSettings);
        }
      } else {
        // Уничтожаем ТОЛЬКО если он существует
        if (swiper !== undefined) {
          swiper.destroy(true, true);
          swiper = undefined; // Важно: очищаем переменную для следующего цикла
        }
        return;
      }
    };

    breakpoint.addEventListener("change", checker);
    checker();
  };

  // callback function to do something when slider is working
  const someFunc = (instance) => {
    if (instance) {
      // console.log(instance)
      instance.on("slideChange", function (e) {
        console.log("*** mySwiper.activeIndex", instance.activeIndex);
      });
    }
  };

  // Swiper initialization

  resizableSwiper(
    "(max-width: 950px)",
    ".installation__card-slider",
    {
      spaceBetween: 20,
      slidesPerView: "auto",
      speed: 500,
      grid: {
        rows: 2,
      },
    },
    // someFunc,
  );
};
