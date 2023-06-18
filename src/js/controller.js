import * as model from "./model.js";
import homePageSlide from "./view/homePageSlide.js";
import homePageView from "./view/homePageView.js";
import showMovieView from "./view/showMovieView.js";
import mainSlide from "./view/movieSlider.js";
//////////////////////////////////////////////////////////////////////////////
const controlHomepage = async function () {
  await model.homePageData();
  homePageView.render(model.state.homepageArr);
  homePageSlide.slide();
};
/////////////////////////////////////////////////////////////////////////////
const controlMovie = async function (sec) {
  await model.movieShow(sec);
  // console.log(model.state.showMovieData[`${sec}`]);
  mainSlide.render(model.state.showMovieData[`${sec}`], sec);

  const markup = mainSlide._genrateMarkup(
    false,
    model.state.showMovieData[`${sec}`]
  );
  mainSlide.eventlistenerSeeMore(sec, markup);

  mainSlide.slide(sec);
  mainSlide.cardRight(sec);
};
///////////////////////////////////////////////////////////////////////////
const controlShowMovie = async function () {
  try {
    const id = window.location.hash;
    if (!id) {
      showMovieView.hideMain();
      mainPage();
      return;
    }
    const mainId = id.slice(1);
    showMovieView.hideMain();
    await model.loadMovie(mainId);
    showMovieView.clear();
    showMovieView.render(model.state.movieData);
    // console.log(model.state.movieData);
  } catch (err) {
    console.log(err);
  }
};
// controlShowMovie();
//////////////////////////////////////////////////////////////////////////////////////
const idControl = function () {
  if (window.location.hash !== "") {
    controlShowMovie();
  }
};

const mainPage = function () {
  controlHomepage();
  controlMovie("topRated");
  controlMovie("popular");
};

const init = function () {
  idControl();
  mainPage();
  showMovieView.addHandlerRender(controlShowMovie);
  showMovieView.addHandlerCloseMovie();
  homePageSlide.eventHandlerSlideTo();
};

init();
