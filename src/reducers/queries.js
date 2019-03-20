const queries = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      const newState = state.filter(value => {
        return value !== action.query;
      });
      newState.unshift(action.query);
      return newState;
    default:
      return state;
  }
};

export default queries;
