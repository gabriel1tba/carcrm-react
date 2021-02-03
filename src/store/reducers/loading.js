import { actionTypes } from '../actions/loading';

const initialState = {
  open: true,
  msg: 'Carregando...',
};

function loadingReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.SHOW_LOADING:
      return { ...state, ...payload };

    default:
      return state;
  }
}

export default loadingReducer;
