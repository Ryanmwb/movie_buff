// import types
import {
  GET_PERSON_CREDITS,
  GET_PERSON_SEARCH,
  GET_POPULAR_PERSONS,
  GET_PERSON_DETAILS,
  LOADING,
  LOADING_CREDITS,
  LOADING_DETAILS
} from "../actions/types";

const initialState = {
  loading: false,
  people: null,
  credits: null,
  details: null,
  loadingDetails: false,
  loadingCredits: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POPULAR_PERSONS:
      return {
        ...state,
        display: "Popular People",
        loading: false,
        people: action.payload
      };
    case GET_PERSON_DETAILS:
      return {
        ...state,
        display: `${action.payload.name}`,
        loadingDetails: false,
        person: action.payload
      };
    case GET_PERSON_SEARCH:
      return {
        ...state,
        display: "Search Results",
        loading: false,
        people: action.payload
      };
    case GET_PERSON_CREDITS:
      return {
        ...state,
        loadingCredits: false,
        credits: action.payload
      };
    case LOADING_CREDITS:
      return {
        ...state,
        loadingCredits: true
      };
    case LOADING_DETAILS:
      return {
        ...state,
        loadingDetails: true
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
