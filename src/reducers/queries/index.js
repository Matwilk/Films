import stringHash from 'string-hash';
import { PATH_CALCULATED } from '../../actions/types';

const queries = (state = {}, action) => {
  switch (action.type) {
    case PATH_CALCULATED:
      const newState = Object.assign({}, state);
      newState[stringHash(`${action.source}:${action.destination}`)] =
        action.path;
      return newState;
    default:
      return state;
  }
};

export default queries;
