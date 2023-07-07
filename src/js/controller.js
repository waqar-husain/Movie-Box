import * as model from "./model.js";
import homePageSlide from "./view/homePageSlide.js";
import homePageView from "./view/homePageView.js";
import showMovieView from "./view/showMovieView.js";
import mainSlide from "./view/movieSlider.js";
import searchResultView from "./view/searchResultView.js";
import searchMoviePagi from "./view/searchMoviePagi.js";

///////HOMEPAGE///////////////////////////////////////////////////////////////////////
const controlHomepage = async function () {
  try {
    await model.homePageData();
    homePageView.render(model.state.homepageArr);
    homePageSlide.slide();
  } catch (err) {
    console.log(err);
  }
};

//Controls Homepage :Calls at the beginning

///////SEARCH RESULTS/////////////////////////////////////////////////////////////////////////////
const controlSearchResults = async function (query) {
  try {
    searchResultView.addClass();
    showMovieView.renderSpinner(document.querySelector(".searchMain"));

    // console.log(query)
    await model.loadSearch(query);
    // console.log(model.state.search.results);

    searchResultView.render(model.state.search.results);

    if (model.state.search.results.length !== 0) {
      searchResultView.hideErrorMessage();
    } else {
      searchResultView.renderError();
    }

    searchMoviePagi.addHandlerMoreResult(controlSearchPagiation);
  } catch (err) {
    console.log("err", err);
  }
};
//Calls when user type on Search bar [controlSearchResults();]

///////SECTION MOVIES//////////////////////////////////////////////////////////////////////
const controlMovie = async function (sec) {
  try {
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
  } catch (err) {
    console.log(err);
  }
};
//Generate Movie Sections : calls at the beginning

/////////SHOWMOVIES//////////////////////////////////////////////////////////////////
const controlShowMovie = async function () {
  try {
    showMovieView.renderSpinner(document.querySelector(".showmovie"));

    document.documentElement.scrollTop = 0;

    const id = window.location.hash;
    if (!isFinite(id.slice(1))) {
      return;
    }
    if (!id) {
      showMovieView.hideMain(true);
      return;
    }
    searchResultView.removeResultBox();
    const mainId = id.slice(1);
    showMovieView.hideMain();
    await model.loadMovie(mainId);
    showMovieView.clear(document.querySelector(".showmovie"));
    showMovieView.render(model.state.movieData);
  } catch (err) {
    console.log("error", err);
  }
};
// Calls when user clicks on movie link [controlShowMovie();]
///////CONTROL SEARCH PAGINATION///////////////////////////////////////////////////////////////////////////////
const controlSearchPagiation = async function () {
  searchMoviePagi.showSearchResults();
  searchResultView.removeResultBox();
  console.log(model.state.search.results);
  searchMoviePagi.render(model.state.search.results, model.state.search.query);
};
// controlSearchPagiation();
//Calls when user clicks on view more results
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
  searchResultView.addHandlerSearch(controlSearchResults);
};

init();
