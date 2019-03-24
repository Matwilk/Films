import queries from '.';

import stringHash from 'string-hash';

describe('queries reducer', () => {
  it('should apply path keyed by string hash to store', () => {
    const path = ['f1, f2'];
    const source = "Abraham Lincoln's Clemency";
    const destination = 'The Englishman and the Girl';
    const hash = stringHash(`${source}:${destination}`);
    const store = queries(
      {},
      { type: 'PATH_CALCULATED', path, source, destination }
    );
    expect(store).toEqual({ [hash]: path });
  });
});
