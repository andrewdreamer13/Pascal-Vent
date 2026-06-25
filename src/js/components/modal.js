import { buildGallery, closeGallery } from "../layouts/gallery-builder.js";
import {
  initFocusManager,
  focusModal,
  restoreFocus,
  setLastFocusedElement
} from "../components/focusManager.js";

export function openModalWindow() {
  initFocusManager();
  const openButtons = document.querySelectorAll("[data-modal]");

  const closeAll = () => {
    const activeModal = document.querySelector(".modal--visible");

    if (activeModal) {
      activeModal.classList.remove("modal--visible");
      activeModal.classList.remove("modal--gallery");

      const successBlock = activeModal.querySelector(".success-block");
      if (
        successBlock &&
        successBlock.classList.contains("success-block--shown")
      ) {
        setTimeout(() => {
          successBlock.classList.remove("success-block--shown");
          const form = activeModal.querySelector("form");
          if (form) form.reset();
        }, 300);
      }
    }

    document.body.classList.remove("modal-open");
    document.documentElement.classList.remove("modal-open");
    restoreFocus();
    closeGallery();
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
     setLastFocusedElement(event.currentTarget);
      const path = event.currentTarget.getAttribute("data-modal");

      const targetModal = document.getElementById(path);

      if (targetModal) {
        targetModal.classList.add("modal--visible");
        document.body.classList.add("modal-open");
        document.documentElement.classList.add("modal-open");
        focusModal(targetModal);

        //  gallery hook
        if (path === "gallery") {
          targetModal.classList.add("modal--gallery");
          const category = event.currentTarget.dataset.galleryType;
          requestAnimationFrame(() => buildGallery(category));
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".close-btn") ||
      e.target.classList.contains("modal")
    ) {
      closeAll();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

// import { buildGallery, closeGallery } from "../layouts/gallery-builder.js";

// export function openModalWindow() {
//   const modal = document.querySelector("#modal");
//   const openButtons = document.querySelectorAll("[data-modal]");

//   const closeAll = () => {
//     modal.classList.remove("modal--visible");
//      modal.classList.remove("modal--gallery");
//     document.body.classList.remove("modal-open");
//     document.documentElement.classList.remove("modal-open");
//     closeGallery();

//     document.querySelectorAll("[data-modal-target]").forEach((target) => {
//       target.classList.remove("modal__content--visible");

//       const successBlock = target.querySelector(".success-block");
//       if (
//         successBlock &&
//         successBlock.classList.contains("success-block--shown")
//       ) {
//         setTimeout(() => {
//           successBlock.classList.remove("success-block--shown");

//           const form = target.querySelector("form");
//           if (form) form.reset();
//         }, 300);
//       }
//     });
//   };

//   openButtons.forEach((button) => {
//     button.addEventListener("click", (event) => {
//       const path = event.currentTarget.getAttribute("data-modal");

//       const targetContent = document.querySelector(
//         `[data-modal-target="${path}"]`,
//       );

//       if (targetContent) {
//         modal.classList.add("modal--visible");

//         targetContent.classList.add("modal__content--visible");

//         document.body.classList.add("modal-open");
//         document.documentElement.classList.add("modal-open");
//         // gallery hook
//         if (path === "gallery") {
//            modal.classList.add("modal--gallery");
//           const category = event.currentTarget.dataset.galleryType;

//           requestAnimationFrame(() => {
//             buildGallery(category);
//           });
//         }
//       }
//     });
//   });

//   modal.addEventListener("click", (e) => {
//     if (e.target.closest(".close-btn") || e.target === modal) {
//       closeAll();
//     }
//   });

//   window.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && modal.classList.contains("modal--visible")) {
//       closeAll();
//     }
//   });
// }
