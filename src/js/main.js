import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
import { initPreloader } from "./components/preloader.js";
import { initServicesAnimation } from "./animations/servicesAnimation.js";
import { initInstallationAnimation } from "./animations/installationAnimation.js";
import { initStepsAnimation } from "./animations/stepsAnimation.js";
import { initRequestAnimation } from "./animations/requestAnimatjon.js";
import { initAboutAnimation } from "./animations/aboutAnimation.js";
import { initComfortAnimation } from "./animations/comfortAnimation.js";
import { initSchemeAnimation } from "./animations/schemeAnimation.js";
import { initProjectsAnimation } from "./animations/projectsAnimation.js";
import { initClientsAnimation } from "./animations/clientsAnimation.js";
import { initFooterAnimation } from "./animations/footerAnimation.js";
import { initFirstScreenAnimation } from "./animations/firstScreenAnimation.js";
import {initUpButton} from "./components/upButton.js"
initPreloader(initFirstScreenAnimation);

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
  initRequestAnimation();
  initAboutAnimation();
  initComfortAnimation();
  initSchemeAnimation();
  initProjectsAnimation();
  initClientsAnimation();
  initFooterAnimation();
  initUpButton();
  const resizeObserver = new ResizeObserver(() => {
    ScrollTrigger.refresh();
  });
  resizeObserver.observe(document.body);

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
