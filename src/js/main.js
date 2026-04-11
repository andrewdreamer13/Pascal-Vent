import "../scss/main.scss";
import "virtual:svg-icons-register";

import "swiper/css";
import "swiper/css/navigation";

import { initBurger } from "./components/burger.js";
import { initSliders } from "./sliders/sliders.js";
import { initAppearance } from "./animations/appearance.js";
import { changeTheme } from "./components/changeTheme.js";
import { initHeader } from "./layouts/header.js";
import { openModalWindow } from "./components/modal.js";
import { initValidation } from "./forms/validation.js";
import { initResizableSwiper } from "./sliders/matchMediaSwiper.js";
import { initLazySvg } from "./layouts/lazySvgLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initBurger("#burger", ".nav");
  initSliders();
  changeTheme();
  openModalWindow();
  initAppearance();
  initValidation("[data-validate]");
  initResizableSwiper();
  initLazySvg();
});
