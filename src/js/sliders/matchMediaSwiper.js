import Swiper from "swiper/bundle";

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
        if (swiper === undefined) {
          return enableSwiper(swiperClass, swiperSettings);
        }
      } else {
        if (swiper !== undefined) {
          swiper.destroy(true, true);
          swiper = undefined; 
        }
        return;
      }
    };

    breakpoint.addEventListener("change", checker);
    checker();
  };


  const someFunc = (instance) => {
    if (instance) {
      
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
