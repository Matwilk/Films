import { FETCH_SUCCESS } from '../../actions/types';

const films = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return Object.assign({}, state, action.indexes);
    default:
      return state;
  }
};

export default films;
