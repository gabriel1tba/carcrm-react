import { units } from '../../mocks/units';

import { actionTypes } from '../actions/units';

const initialState = {
  units,
  unit: units[0],
  success: false,
  error: {},
};

const unitsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INDEX:
      return { ...state, ...payload };

    case actionTypes.STORE:
      return {
        ...state,
        units: [...[payload], ...state.units],
      };

    case actionTypes.UPDATE:
      let index = state.units.findIndex((item) => item.id === payload.id);
      state.units[index] = payload;

      return {
        ...state,
        units: [...state.units],
      };

    case actionTypes.DESTROY:
      return {
        ...state,
        units: state.units.filter((item) => item.id !== payload),
      };

    case actionTypes.CHANGE:
      return {
        ...state,
        unit:
          payload === 'clear'
            ? {}
            : {
                ...state.unit,
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
};

export default unitsReducer;
