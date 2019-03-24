import 'whatwg-fetch';

import createIndexesAsync from '../utils/createIndexesAsync/.';
import computePathAsync from '../utils/computePathAsync/.';
import {
  FETCH_SUCCESS,
  FETCH_PENDING,
  FETCH_FAIL,
  PATH_CALCULATED
} from './types';

export function fetchDataSuccess(indexes) {
  return {
    type: FETCH_SUCCESS,
    indexes
  };
}

export function fetchPending() {
  return {
    type: FETCH_PENDING
  };
}

export function fetchError() {
  return {
    type: FETCH_FAIL
  };
}

export function pathCalculated(source, destination, path) {
  return {
    type: PATH_CALCULATED,
    source,
    destination,
    path
  };
}

export function fetchFilms() {
  return dispatch => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url =
      'https://s3.eu-west-2.amazonaws.com/cognitionx-assets/movies.json';

    dispatch(fetchPending());

    return fetch(proxy + url)
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

export function computePath(index, source, destination) {
  return dispatch => {
    computePathAsync(index, source, destination).then(path =>
      dispatch(pathCalculated(source, destination, path))
    );
  };
}
