import { actionsTypes } from '../actions/auth';

const initialState = {
  credentials: {},
  success: false,
};

function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionsTypes.CLEAR:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          ...payload,
        },
      };

    case actionsTypes.SUCCESS:
      return {
        ...state,
        success: payload,
      };

    default:
      return state;
  }
}

export default authReducer;
