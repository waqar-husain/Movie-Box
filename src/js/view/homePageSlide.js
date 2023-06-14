import { Slide_Timer } from "../config";

class SlideHomepage {
  slide() {
    const main = document
      .querySelector(".main")
      .classList.contains("main-none");
    if (main) return;
    const slides = document.querySelectorAll(".homepage");
    let curSlide = 0;
    const maxSlide = slides.length - 1;
    slides.forEach((el, i) => {
      return (el.style.transform = `translateX(${100 * i}%)`);
    });

    setInterval(function () {
      curSlide === maxSlide ? (curSlide = 0) : curSlide++;
      slides.forEach((el, i) => {
        el.style.transform = `translateX(${100 * (i - curSlide)}%)`;
      });

      document
        .querySelectorAll(".slide-to")
        .forEach((el) => el.classList.remove("current-slide"));

      document
        .querySelector(`.slide-to[data-slide="${curSlide + 1}"]`)
        .classList.add("current-slide");
    }, Slide_Timer * 1000);
  }

  eventHandlerSlideTo() {
    const slideContainer = document.querySelector(".slide-movies");

    slideContainer.addEventListener("click", function (e) {
      const slides = document.querySelectorAll(".homepage");
      const btn = e.target.closest(".slide-to");
      if (!btn) return;
      const { slide } = btn.dataset;
      slides.forEach((el, i) => {
        el.style.transform = `translateX(${100 * (i - (slide - 1))}%)`;
      });
      document
        .querySelectorAll(".slide-to")
        .forEach((el) => el.classList.remove("current-slide"));

      document
        .querySelector(`.slide-to[data-slide="${slide}"]`)
        .classList.add("current-slide");
    });
  }
}
export default new SlideHomepage();
