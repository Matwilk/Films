import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchFilms } from './';

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

describe('fetchFilms actions', () => {
  it('should call createIndexesAsync with films returned from fetch', () => {
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
        type: 'FETCH_PENDING'
      });
      expect(expectedActions).toContainEqual({
        type: 'FETCH_SUCCESS',
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
});
