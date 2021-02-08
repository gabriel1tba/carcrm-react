import { combineReducers } from 'redux';

import loadingReducer from './loading';
import notifyReducer from './notify';
import alertReducer from './alert';
import authReducer from './auth';
import registerReducer from './register';

const rootReducer = combineReducers({
  loadingReducer,
  notifyReducer,
  alertReducer,
  authReducer,
  registerReducer,
});

export default rootReducer;
