import { combineReducers } from 'redux';

import loadingReducer from './loading';
import notifyReducer from './notify';
import alertReducer from './alert';
import authReducer from './auth';
import registerReducer from './register';
import vehiclesReducer from './vehicles';
import navigationReducer from './navigation';
import notesReducer from './notes';
import ownersReducer from './owners';

const Reducers = combineReducers({
  loadingReducer,
  notifyReducer,
  alertReducer,
  authReducer,
  registerReducer,
  vehiclesReducer,
  navigationReducer,
  notesReducer,
  ownersReducer,
});

export default Reducers;
