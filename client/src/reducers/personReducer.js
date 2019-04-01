// import types
import {
  GET_PERSON_CREDITS,
  GET_PERSON_SEARCH,
  GET_POPULAR_PERSONS,
  GET_PERSON_DETAILS,
  LOADING
} from "../actions/types";

const initialState = {
  loading: false,
  people: null,
  credits: null,
  details: null
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
      console.log("reducer, pDetails - payload is...");
      console.log(action.payload);
      return {
        ...state,
        display: `${action.payload.name}`,
        loading: false,
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
      console.log("reducer, pCredits - payload is..");
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        credits: action.payload
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
