import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './reducers';

const middleware = [ReduxThunk];

export const store = createStore(Reducers, applyMiddleware(...middleware));
