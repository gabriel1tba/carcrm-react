import { actionTypes } from '../actions/notify';

const initialState = {
  open: true,
  horizontal: 'center',
  vertical: 'top',
  class: 'success',
  time: 3000,
  msg: 'Dados atualizados',
};

function notifyReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.SHOW_NOTIFY:
      return { ...state, ...payload };

    default:
      return state;
  }
}

export default notifyReducer;
