import { actionTypes } from '../actions/loading';

const initialState = {
  open: false,
  msg: 'Aguarde! Carregando...',
};

function loadingReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.CHANGE_VIEW_LOADING:
      return { ...state, ...payload };

    default:
      return state;
  }
}

export default loadingReducer;
