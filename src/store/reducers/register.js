import { actionTypes } from '../actions/register';

const initialState = {
  user: { name: '', email: '', password: '' },
  success: false,
  error: {},
};

function registerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.EDIT:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };

    case actionTypes.SUCCESS:
      return {
        ...state,
        success: payload,
      };

    case actionTypes.ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}

export default registerReducer;
