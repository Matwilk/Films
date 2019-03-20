import createIndexesAsync from '../utils/createIndexesAsync';

export function fetchDataSuccess(indexes) {
  return {
    type: 'FETCH_SUCCESS',
    indexes
  };
}

export function fetchPending() {
  return {
    type: 'FETCH_PENDING'
  };
}

export function fetchError() {
  return {
    type: 'FETCH_FAIL'
  };
}

export function fetchFilms() {
  return dispatch => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url =
      'https://s3.eu-west-2.amazonaws.com/cognitionx-assets/movies.json';

    dispatch(fetchPending());

    fetch(proxy + url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(films => createIndexesAsync(films))
      .then(indexes => dispatch(fetchDataSuccess(indexes)))
      .catch(() => {
        dispatch(fetchError());
      });
  };
}

export function addSearch(query) {
  return {
    type: 'ADD_SEARCH',
    query
  };
}
