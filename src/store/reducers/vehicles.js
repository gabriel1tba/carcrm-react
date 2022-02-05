import { actionTypes } from '../actions/vehicles';

const initialState = {
  vehicles: {
    data: [],
  },
  vehicle: {},
  vehicle_brand: [],
  vehicle_model: [],
  vehicle_version: [],
  success: false,
  errors: {},
};

function vehiclesReducer(state = initialState, { type, payload, isLoadMore }) {
  switch (type) {
    case actionTypes.INDEX:
      if (isLoadMore) {
        payload.vehicles.data = [
          ...state.vehicles.data,
          ...payload.vehicles.data,
        ];
      }
      return { ...state, ...payload };

    case actionTypes.DESTROY:
      return {
        ...state,
        vehicles: {
          ...state.vehicles,
          data: state.vehicles.data.filter((vehicle) => vehicle.id !== payload),
        },
      };

    case actionTypes.CHANGE:
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
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

export default vehiclesReducer;
