import { combineReducers } from "redux";
import * as types from "./actions/action_types";

const initialState = {
  loading: false,
  users: [],
  error: "",
  repos: [],
};

function usersReducer(state = initialState, {type, payload}) {
  switch (type) {
    case types.FETCH_USERS:
      return {
        ...state,
        users: payload,
      }

    default:
      return state;
  }
};


function reposReducer(state = initialState, {type, payload}) {
  switch (type) {
    case types.FETCH_REPOS:
      return {
        ...state,
        repos: payload,
      }

    default:
      return state;
  }
};

export default combineReducers({
  users: usersReducer,
  repos: reposReducer,
});
