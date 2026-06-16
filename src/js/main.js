

import "../scss/main.scss";
import "virtual:svg-icons-register";

import "swiper/css";
import "swiper/css/navigation";

import { initBurger } from "./components/burger.js";
import { initSliders } from "./sliders/sliders.js";
import { changeTheme } from "./components/changeTheme.js";
import { initHeader } from "./layouts/header.js";
import { openModalWindow } from "./components/modal.js";
import { initValidation } from "./forms/validation.js";
import { initResizableSwiper } from "./sliders/matchMediaSwiper.js";
import { initLazySvg } from "./layouts/lazySvgLoader.js";
import { initTabs } from "./components/tabs.js";
import {initPreloader} from "./components/preloader.js"
import { initServicesAnimation } from "./animations/servicesAnimation.js";
import {initInstallationAnimation} from "./animations/installationAnimation.js"
import {initStepsAnimation} from "./animations/stepsAnimation.js"
// initPreloader();

document.addEventListener("DOMContentLoaded", () => {

  initHeader();
  initBurger("#burger", ".nav");
  initSliders();
  changeTheme();
  openModalWindow();
  initValidation("[data-validate]");
  initResizableSwiper();
  initTabs();
  initServicesAnimation();
  initInstallationAnimation();
  initStepsAnimation();
  
  
  (async () => {
    try {
      await import("./layouts/svg-templates.js");
      initLazySvg();
    } catch (error) {
      console.error("SVG template lazy-loading error:", error);
      initLazySvg();
    }
  })();
});




