import * as model from "./model.js";
import homePageSlide from "./view/homePageSlide.js";
import homePageView from "./view/homePageView.js";
import showMovieView from "./view/showMovieView.js";
//////////////////////////////////////////////////////////////////////////////
const controlHomepage = async function () {
  await model.homePageData();
  homePageView.render(model.state.homepageArr);
  homePageSlide.slide();
};
/////////////////////////////////////////////////////////////////////////////
const controlMovie = async function () {
  await model.movieShow("topRated");
  console.log(model.state.showMovieData.topRated);
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
  controlMovie();
  showMovieView.addHandlerRender(controlShowMovie);
  showMovieView.addHandlerCloseMovie();
  homePageSlide.eventHandlerSlideTo();
};

init();
