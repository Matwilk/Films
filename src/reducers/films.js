const films = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return Object.assign([], state, action.films);
    default:
      return state;
  }
};

export default films;
