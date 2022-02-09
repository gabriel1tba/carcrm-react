import { actionTypes } from '../actions/navigation';

const initialState = {
  screen1: {
    open: false,
    type: null,
    props: {},
  },
  screen2: {
    open: false,
    type: null,
    props: {},
  },
  screen3: {
    open: false,
    type: null,
    props: {},
  },
};

const navigationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SCREEN_NV_1:
      return {
        ...state,
        screen1: {
          ...payload,
        },
      };

    case actionTypes.SCREEN_NV_2:
      return {
        ...state,
        screen2: {
          ...payload,
        },
      };

    case actionTypes.SCREEN_NV_3:
      return {
        ...state,
        screen3: {
          ...payload,
        },
      };

    default:
      return state;
  }
};

export default navigationReducer;
