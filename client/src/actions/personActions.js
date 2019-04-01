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
  dispatch(loading());
  console.log("action - getPersonDetails.  Id is...");
  console.log(id);
  dispatch(getPersonCredits(id));
  axios.get(`/api/people/${id}/details`).then(res => {
    dispatch({
      type: GET_PERSON_DETAILS,
      payload: res.data
    });
  });
};

export const getPersonCredits = id => dispatch => {
  console.log("action - getPersonCredits.  ID is...");
  console.log(id);
  axios.get(`/api/people/${id}/credits`).then(res => {
    dispatch({
      type: GET_PERSON_CREDITS,
      payload: res.data.cast
    });
  });
};

// get person search
export const getPersonSearch = query => dispatch => {
  console.log("action - get personsearch...");
  console.log(query);
  dispatch(loading());
  axios
    .request({
      method: "POST",
      url: "/api/people/search",
      data: { query }
    })
    .then(res => {
      console.log("action- getpersonsearch");
      console.log(res);
      dispatch({
        type: GET_PERSON_SEARCH,
        payload: res.data.results
      });
    });
};

// set loading to true
export const loading = () => dispatch => {
  dispatch({
    type: LOADING
  });
};
