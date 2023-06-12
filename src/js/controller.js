import * as model from "./model.js";

const controlShowMovie = async function () {
  try {
    await model.loadMovie("385687");

    console.log(model.state.movieData);
  } catch (err) {
    console.log(err);
  }
};

controlShowMovie();
