import { combineReducers } from 'redux';

import films from './films/.';
import queries from './queries/.';
import status from './status/.';

const reducers = combineReducers({ films, queries, status });

export default reducers;
