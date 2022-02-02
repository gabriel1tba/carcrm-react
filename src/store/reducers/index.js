import { combineReducers } from 'redux';

import loadingReducer from './loading';
import notifyReducer from './notify';
import alertReducer from './alert';
import authReducer from './auth';
import registerReducer from './register';
import vehiclesReducer from './vehicles';

const Reducers = combineReducers({
  loadingReducer,
  notifyReducer,
  alertReducer,
  authReducer,
  registerReducer,
  vehiclesReducer,
});

export default Reducers;
