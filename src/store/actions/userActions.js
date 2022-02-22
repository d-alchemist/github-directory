import { githubAPI } from "../../utils/axios";
import * as types from "./action_types";

export const fetchUsers = () => async (dispatch, getState) => {
  dispatch({type: types.SET_LOADING, payload: true});

  const { users: { perPage } } = getState();
  
  try {
    const { data } = await githubAPI.get("/users", {
      params: {
        per_page: perPage, 
      }
    });
    dispatch({
      type: types.FETCH_USERS,
      payload: data,
    })
  } catch(error) {
    dispatch({
      type: types.FETCH_USER_ERROR,
      payload: error,
    })
  } finally {
    dispatch({type: types.SET_LOADING, payload: false});
  }
}

export const fetchSearchData = (input) => async (dispatch, getState) => {
  if (!input) {
    dispatch({type: types.SET_ERROR, payload: "Please enter search parameter"});
    return;
  }

  dispatch({type: types.SET_LOADING, payload: true});

  const { users: { perPage, page } } = getState();

  try {
    const { data: { items, total_count } } = await githubAPI.get("/search/users", {
        params: { q: input, page, perPage },
      }
    );

    if (total_count === 0) {
      dispatch({type: types.SET_ERROR, payload: "User does not exist"});
    }

    if (items.length) {
      dispatch({
        type: types.SEARCH_USERS,
        payload: items,
      });
    }
    
  } catch(error) {
    dispatch({
      type: types.FETCH_REPOS_ERROR,
      payload: error,
    });
    console.error(error);
  } finally {
    dispatch({type: types.SET_LOADING, payload: false});
  }
}

export const fetchMore = () => {
  return {
    type: types.FETCH_MORE_USERS,
  }
}

export const goToNextPage = () => {
  return {
    type: types.GO_TO_NEXT_PAGE,
  }
}

export const clearUserData = () => {
  return {
    type: types.CLEAR_USER_DATA,
  }
}
