// import axios
import axios from "axios";

// import types
import {
  GET_PERSON_CREDITS,
  GET_PERSON_SEARCH,
  GET_POPULAR_PERSONS,
  GET_PERSON_DETAILS,
  LOADING
} from "./types";

// get popular people
export const getPopularPeople = () => dispatch => {
  console.log("action - getpopularpeople()");
  dispatch(loading());
  axios.get("/api/people/popular").then(res =>
    dispatch({
      type: GET_POPULAR_PERSONS,
      payload: res.data.results
    })
  );
};

// get person details
export const getPersonDetails = id => dispatch => {
  console.log("action - getpersondetails...");
  console.log(id);
  dispatch(loading());
  axios.get(`/api/people/${id}/details`).then(res => {
    dispatch({
      type: GET_PERSON_DETAILS,
      payload: res.data
    });
  });
};

// set loading to true
export const loading = () => dispatch => {
  dispatch({
    type: LOADING
  });
};
