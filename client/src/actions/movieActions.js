// import axios
import axios from "axios";

// import types
import {
  GET_UPCOMING,
  GET_NOW_PLAYING,
  GET_MOVIE_DETAILS,
  GET_MOVIE_SEARCH,
  GET_RECOMMENDATIONS,
  GET_MOVIE_CREDITS,
  LOADING
} from "./types";

// get movies coming soon
export const getComingSoon = () => dispatch => {
  console.log("client side, getnowplaying action called...");
  dispatch(movieLoading());
  axios
    .get("/api/movie/coming_soon")
    .then(res =>
      dispatch({
        type: GET_UPCOMING,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// get movies now playing
export const getNowPlaying = () => dispatch => {
  console.log("getNowPlaying action...");
  dispatch(movieLoading());
  axios
    .get("/api/movie/playing_now")
    .then(res =>
      dispatch({
        type: GET_NOW_PLAYING,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// get movie search
export const getMovieSearch = query => dispatch => {
  console.log("action - getmoviesearch...");
  console.log(query);
  dispatch(movieLoading());
  axios
    .request({
      method: "POST",
      url: "/api/movie/search",
      data: { movie: query }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_MOVIE_SEARCH,
        payload: res.data,
        search: query
      });
    });
};

// set loading to true
export const movieLoading = () => {
  console.log("movieLoading action called...");
  return {
    type: LOADING
  };
};
