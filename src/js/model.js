import { AJAX } from "./helper";
import { API_URL, lang } from "./config";

export const state = {
  movieData: {},
};

const youtubeUrl = "https://www.youtube.com/watch?v=";
const imgUrl = "https://image.tmdb.org/t/p/";

const createMovieData = function (data, trailer, cast) {
  return {
    movieName: data.original_title,
    releaseDate: new Date(data.release_date),
    genre: data.genres,
    imdbRate: Math.ceil(data.vote_average),
    tomatoRate: Math.trunc(data.vote_average * 10),
    tagline: data.tagline,
    overview: data.overview,
    status: data.status,
    language: data.original_language,
    budget: data.budget,
    revenue: data.revenue,
    trailer: `${youtubeUrl}${trailer}`,
    posterPath: `${imgUrl}w500/${data.poster_path}`,
    backgroundPath: `${imgUrl}w1280/${data.backdrop_path}`,
    castArr: cast,
  };
};

export const loadMovie = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?${lang}`);
    const trailerData = await videoData(id);
    const cast = await castData(id);
    state.movieData = createMovieData(data, trailerData, cast);
  } catch (err) {
    throw err;
  }
};

const videoData = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}/videos?${lang}`);
    const trailer = data.results.find(function (el) {
      return el.type === "Trailer";
    });
    return trailer.key;
  } catch (err) {
    throw err;
  }
};

const castData = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}/credits?${lang}`);
    const castArr = data.cast.slice(0, 10);
    const newCastArr = castArr.map((el) => {
      return {
        name: el.name,
        characterName: el.character,
        castImg: `${imgUrl}w185/${el.profile_path}`,
      };
    });
    return newCastArr;
  } catch (err) {
    throw err;
  }
};
