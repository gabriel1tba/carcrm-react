import { combineReducers } from 'redux';

import loadingReducer from './loading';
import notifyReducer from './notify';

const rootReducer = combineReducers({ loadingReducer, notifyReducer });

export default rootReducer;
