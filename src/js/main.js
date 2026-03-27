import "../scss/main.scss";
import "virtual:svg-icons-register";


import gsap from "gsap";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { initBurger } from "./components/burger.js";
import { initSliders } from "./modules/sliders.js";
import { initAppearance } from "./animations/appearance.js";
import { changeTheme } from "./components/changeTheme.js";
import { initHeader } from "./layouts/header.js";

document.addEventListener("DOMContentLoaded", () => {

  initHeader();
  initBurger("#burger", ".nav");
  initSliders();
  changeTheme();

  initAppearance();
});
