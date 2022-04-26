import { plans } from '../../mocks/plans';

import { actionTypes } from '../actions/pay';

const initialState = {
  plans,
  plan: {},
  pay_type: null,
  success: null,
  error: {},
};
const payReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CHANGE:
      return { ...state, ...payload };

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
};

export default payReducer;
