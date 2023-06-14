import * as model from "./model.js";
import homePageSlide from "./view/homePageSlide.js";
import homePageView from "./view/homePageView.js";
import showMovieView from "./view/showMovieView.js";

const controlHomepage = async function () {
  await model.homePageData();
  console.log(model.state.homepageArr);
  homePageView.render(model.state.homepageArr);
  homePageSlide.slide();
};

const controlShowMovie = async function () {
  try {
    showMovieView.hideMain();

    await model.loadMovie("76600");

    showMovieView.render(model.state.movieData);
    console.log(model.state.movieData);
  } catch (err) {
    console.log(err);
  }
};

// controlShowMovie();

const init = function () {
  showMovieView.addHandlerCloseMovie();
  controlHomepage();
  homePageSlide.eventHandlerSlideTo();
};

init();
