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
import appReducer from './app';
import unitsReducer from './units';
import payReducer from './pay';
import transactionsReducer from './transactions';

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
  appReducer,
  unitsReducer,
  payReducer,
  transactionsReducer,
});

export default Reducers;
