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
  console.log(model.state.showMovieData[`${sec}`]);
  mainSlide.render(model.state.showMovieData[`${sec}`], sec);
  mainSlide.slide(sec);
  mainSlide.cardRight("topRated");
  mainSlide.cardLeft("topRated");
};
///////////////////////////////////////////////////////////////////////////
const controlShowMovie = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    showMovieView.hideMain();

    await model.loadMovie(id);
    showMovieView.clear();
    showMovieView.render(model.state.movieData);
    console.log(model.state.movieData);
  } catch (err) {
    console.log(err);
  }
};
// controlShowMovie();
//////////////////////////////////////////////////////////////////////////////////////

const init = function () {
  controlHomepage();
  controlMovie("topRated");
  showMovieView.addHandlerRender(controlShowMovie);
  showMovieView.addHandlerCloseMovie();
  homePageSlide.eventHandlerSlideTo();
};

init();
