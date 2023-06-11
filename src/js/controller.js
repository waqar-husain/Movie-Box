import * as model from "./model.js";

const controlShowMovie = async function () {
  try {
    await model.loadMovie("603692");
    console.log(model.state.movieData);
  } catch (err) {
    console.log(err);
  }
};

controlShowMovie();
