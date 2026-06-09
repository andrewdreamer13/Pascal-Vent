
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const initPreloader = async () => {
  const preloader = document.querySelector("#preloader");
  if (!preloader) return;

  const pageLoaded = new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", resolve, { once: true });
    }
  });

  await Promise.all([pageLoaded, delay(3000)]);

  preloader.classList.add("hide");

  await delay(600);
  preloader.remove();
};
