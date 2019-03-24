import createIndexesAsync from './createIndexesAsync';
import { films, indexes } from './fixtures';

describe('computeIndexAsync function', () => {
  it('should create indexes from film json', () => {
    return createIndexesAsync(films).then(result => {
      expect(result).toEqual(indexes);
    });
  });
});
