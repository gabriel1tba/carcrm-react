import { combineReducers } from 'redux';

import loadingReducer from './loading';

const rootReducer = combineReducers({ loadingReducer });

export default rootReducer;
