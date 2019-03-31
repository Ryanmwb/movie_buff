//import types
import {
  GET_UPCOMING,
  GET_NOW_PLAYING,
  GET_MOVIE_DETAILS,
  GET_RECOMMENDATIONS,
  GET_MOVIE_CREDITS,
  GET_MOVIE_SEARCH,
  LOADING
} from "../actions/types";

const initialState = {
  display: null,
  nowPlaying: null,
  upcoming: null,
  movieDetails: null,
  recommendations: null,
  search: null,
  movieCredits: null,
  discover: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_UPCOMING:
      return {
        ...state,
        display: "Coming Soon",
        loading: false,
        upcoming: action.payload
      };
    case GET_NOW_PLAYING:
      console.log("reducer - getnowplaying...");
      return {
        ...state,
        display: "Now Playing",
        loading: false,
        nowPlaying: action.payload
      };
    case GET_MOVIE_SEARCH:
      console.log("reducer - getMovieSearch");
      return {
        ...state,
        display: "Search Results",
        search: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      console.log(state);
      return state;
  }
}
