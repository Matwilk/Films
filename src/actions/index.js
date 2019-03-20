export function fetchDataSuccess(films) {
  return {
    type: 'FETCH_SUCCESS',
    films
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
      .then(films => dispatch(fetchDataSuccess(films)))
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
