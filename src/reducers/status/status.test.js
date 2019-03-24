import status from '.';

describe('films reducer', () => {
  it('should set status to PENDING for FETCH_PENDING', () => {
    const result = status({}, { type: 'FETCH_PENDING' });
    expect(result).toEqual('PENDING');
  });

  it('should set status to FAILED for FETCH_FAIL', () => {
    const result = status({}, { type: 'FETCH_FAIL' });
    expect(result).toEqual('FAILED');
  });

  it('should set status to SUCCESS for FETCH_SUCCESS', () => {
    const result = status({}, { type: 'FETCH_SUCCESS' });
    expect(result).toEqual('SUCCESS');
  });
});
