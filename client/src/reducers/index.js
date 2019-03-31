import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import personReducer from "./personReducer";

export default combineReducers({
  movie: movieReducer,
  people: personReducer
});
