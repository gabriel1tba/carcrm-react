import { combineReducers } from 'redux';

import loadingReducer from './loading';
import notifyReducer from './notify';
import alertReducer from './alert';

const rootReducer = combineReducers({
  loadingReducer,
  notifyReducer,
  alertReducer,
});

export default rootReducer;
