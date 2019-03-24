import computePathAsync from '.';
import { indexes } from '../fixtures';

describe('computePathAsync function', () => {
  const source = "Abraham Lincoln's Clemency";
  const destination = 'The Englishman and the Girl';
  it('should compute the path between two films', () => {
    return computePathAsync(indexes.indexes, source, destination).then(path => {
      expect(path).toEqual(["Abraham Lincoln's Clemency", 'As It Is In Life']);
    });
  });
});
