import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchFilms, computePath } from './';
import computePathAsync from '../utils/computePathAsync/.';

import {
  FETCH_PENDING,
  FETCH_SUCCESS,
  PATH_CALCULATED
} from '../actions/types';

jest.mock('../utils/computePathAsync/.');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

const films = [{ title: 'f1', cast: [] }, { title: 'f2', cast: [] }];

describe('actions', () => {
  it('fetchFilms should request dilms and return created indexes', () => {
    const store = mockStore();
    window.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockResponse(200, null, JSON.stringify(films)))
      );

    return store.dispatch(fetchFilms()).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions.length).toBe(2);
      expect(expectedActions).toContainEqual({
        type: FETCH_PENDING
      });
      expect(expectedActions).toContainEqual({
        type: FETCH_SUCCESS,
        indexes: {
          indexes: {
            byActor: {},
            byTitle: {
              f1: { cast: [], title: 'f1' },
              f2: { cast: [], title: 'f2' }
            }
          }
        }
      });
    });
  });

  it('computePath should request calculation and dispatch path calculated action', () => {
    const dispatch = jest.fn();
    const index = { byActor: {}, byTitle: {} };
    const source = 'As It Is In Life';
    const destination = "Abraham Lincoln's Clemency";
    const path = [1, 2, 3, 4];
    computePathAsync.mockImplementation(() => {
      return Promise.resolve(path);
    });
    const asyncFunc = computePath(index, source, destination);
    return asyncFunc(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: PATH_CALCULATED,
        destination,
        source,
        path
      });
    });
  });
});
