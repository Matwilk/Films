import films from '.';

describe('films reducer', () => {
  it('should apply indexes to store for FETCH_SUCCESS', () => {
    const indexes = {
      byActor: {
        a1: [],
        a2: []
      },
      byTitle: {
        f1: {},
        f2: {}
      }
    };
    const store = films({}, { type: 'FETCH_SUCCESS', indexes });
    expect(store).toEqual(indexes);
  });
});
