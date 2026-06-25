// focus-manager.js

const FOCUSABLE_SELECTORS = `
  a[href],
  button:not([disabled]),
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  [tabindex]:not([tabindex="-1"])
`;

let lastFocusedElement = null;

function getFocusableElements(container) {
  return [...container.querySelectorAll(FOCUSABLE_SELECTORS)].filter(
    (element) =>
      !element.hasAttribute("disabled") && element.offsetParent !== null,
  );
}

function trapTabKey(event, modal) {
  if (event.key !== "Tab") return;

  const focusableElements = getFocusableElements(modal);

  if (!focusableElements.length) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  } else {
    if (document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}

export function initFocusManager() {
  document.addEventListener("keydown", (event) => {
    const activeModal = document.querySelector(".modal--visible");

    if (!activeModal) return;

    if (event.key === "Escape") {
      const closeButton = activeModal.querySelector("[data-modal-close]");

      closeButton?.click();
      return;
    }

    trapTabKey(event, activeModal);
  });
}

export function focusModal(modal) {
  const focusableElements = getFocusableElements(modal);

  if (!focusableElements.length) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      focusableElements[0].focus();
    });
  });
}



export function setLastFocusedElement(el) {
  lastFocusedElement = el;
}

export function restoreFocus() {
  lastFocusedElement?.focus();
  lastFocusedElement = null;
}
