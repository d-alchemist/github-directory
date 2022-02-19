import { githubAPI } from "../../utils/axios";
import * as types from "./action_types";


export const fetchRepos = () => async (dispatch) => {
  dispatch({type: types.SET_LOADING, payload: true});
  try {
    const { data } = await githubAPI.get("/repositories");
    dispatch({
      type: types.FETCH_REPOS,
      payload: data,
    })
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

export const fetchUsers = () => async (dispatch) => {
  dispatch({type: types.SET_LOADING, payload: true});
  try {
    const { data } = await githubAPI.get("/users");
    console.log(data);
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

