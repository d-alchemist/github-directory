import * as types from "../actions/action_types";

const initialState = {
  loading: false,
  error: "",
  repos: [],
  page: 1,
  perPage: 100,
};

export default function reposReducer(state = initialState, {type, payload}) {
  switch (type) {
    case types.FETCH_REPOS:
      return {
        ...state,
        repos: [...state.repos, ...payload],
      }

    case types.SEARCH_REPOS:
      return {
        ...state,
        repos: [...state.repos, ...payload],
      }

    case types.FETCH_MORE_REPOS:
      return {
        ...state,
        page: state.page + 1,
      }
    
    case types.GO_TO_NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      }

    case types.CLEAR_REPO_DATA: 
      return {
        ...state,
        repos: [],
        page: 1,
        perPage: 100,
        error: "",
      }

    case types.SET_ERROR:
      return {
        ...state,
        error: payload,
      }

    default:
      return state;
  }
};