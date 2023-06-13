import * as model from "./model.js";
import showMovieView from "./view/showMovieView.js";

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

controlShowMovie();

const init = function () {
  showMovieView.addHandlerCloseMovie();
};

init();
