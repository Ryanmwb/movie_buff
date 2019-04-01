//import types
import {
  GET_UPCOMING,
  GET_NOW_PLAYING,
  GET_MOVIE_DETAILS,
  GET_RECOMMENDATIONS,
  GET_MOVIE_CREDITS,
  GET_MOVIE_SEARCH,
  LOADING,
  LOADING_CREDITS,
  LOADING_DETAILS
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
      return {
        ...state,
        display: "Now Playing",
        loading: false,
        nowPlaying: action.payload
      };
    case GET_MOVIE_SEARCH:
      return {
        ...state,
        display: "Search Results",
        search: action.payload,
        loading: false
      };
    case GET_MOVIE_DETAILS:
      console.log("reducer - get movie details");
      return {
        ...state,
        movieDetails: action.payload,
        loadingDetails: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOADING_DETAILS:
      return {
        ...state,
        loadingDetails: true
      };
    default:
      return state;
  }
}
