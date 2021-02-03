import { actionTypes } from '../actions/alert';

const initialState = {
  open: false,
  class: 'success',
  time: 3000,
  msg: 'Dados atualizados',
};

function alertReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.SHOW_ALERT:
      return { ...state, ...payload };

    default:
      return state;
  }
}

export default alertReducer;
