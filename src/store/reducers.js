import { combineReducers } from "redux";
import reposReducer from "./reducers/reposReducer";
import usersReducer from "./reducers/usersReducer";

export default combineReducers({
  users: usersReducer,
  repos: reposReducer,
});
