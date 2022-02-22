import { githubAPI } from '../../utils/axios';
import * as types from './action_types';

export const fetchRepos = () => async (dispatch, getState) => {
	dispatch({ type: types.SET_LOADING, payload: true });

	const { repos: { page, perPage } } = getState();

	try {
		const { data } = await githubAPI.get('/repositories', {
			params: { page, perPage },
		});
		
		dispatch({
			type: types.FETCH_REPOS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: types.FETCH_REPOS_ERROR,
			payload: error,
		});
		console.error(error);
	} finally {
		dispatch({ type: types.SET_LOADING, payload: false });
	}
};

export const searchRepoData = (input) => async (dispatch, getState) => {
	if (!input) {
    dispatch({type: types.SET_ERROR, payload: "Please enter search parameter"});
    return;
  }

	dispatch({ type: types.SET_LOADING, payload: true });

	const { repos: { perPage, page, } } = getState();

	try {
		const { data: { items, total_count } } = await githubAPI.get('/search/repositories', {
			params: { q: input, page, perPage },
		});

		if (items.length) {
			dispatch({
				type: types.SEARCH_REPOS,
				payload: items,
			});
		}

		if (total_count === 0) {
			dispatch({ type: types.SET_ERROR, payload: 'repository does not exist' });
		}

		dispatch({
			type: types.FETCH_REPOS,
			payload: items,
		});

	} catch (error) {
		dispatch({
			type: types.FETCH_REPOS_ERROR,
			payload: error.response?.data?.message,
		});
    console.error(error);
	} finally {
		dispatch({ type: types.SET_LOADING, payload: false });
	}
};

export const fetchMoreRepos = () => {
	return {
		type: types.FETCH_MORE_REPOS,
	};
};

export const goToNextPage = () => {
	return {
		type: types.GO_TO_NEXT_PAGE,
	};
};

export const clearRepoData = () => {
	return {
		type: types.CLEAR_REPO_DATA,
	};
};
