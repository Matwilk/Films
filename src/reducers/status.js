const status = (state = '', action) => {
  switch (action.type) {
    case 'FETCH_PENDING':
      return 'PENDING';
    case 'FETCH_FAIL':
      return 'FAILED';
    case 'FETCH_SUCCESS':
      return 'SUCCESS';
    default:
      return state;
  }
};

export default status;
