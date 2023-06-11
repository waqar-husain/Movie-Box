import { AJAX } from "./helper";
import { API_URL, lang } from "./config";

export const state = {
  movieData: {},
};

const createMovieData = function (data, trailer) {
  return {
    movieName: data.original_title,
    releaseDate: data.release_date,
    genre: data.genres,
    imdbRate: Math.ceil(data.vote_average),
    tomatoRate: Math.trunc(data.vote_average * 10),
    tagline: data.tagline,
    overview: data.overview,
    state: data.status,
    language: data.original_language,
    budget: data.budget,
    revenue: data.revenue,
    trailer: trailer,
  };
};

export const loadMovie = async function (id) {
  const data = await AJAX(`${API_URL}/${id}?${lang}`);
  const trailerData = await videoData(id);
  state.movieData = createMovieData(data, trailerData);

  console.log(data);
};

const videoData = async function (id) {
  const data = await AJAX(`${API_URL}/${id}/videos?${lang}`);
  const trailer = data.results.find(function (el) {
    return el.type === "Trailer";
  });
  return trailer;
};
