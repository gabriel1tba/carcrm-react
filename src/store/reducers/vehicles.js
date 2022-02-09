import { actionTypes } from '../actions/vehicles';

const initialState = {
  vehicles: {
    data: [],
  },
  vehicle: {
    vehicle_features: [],
  },
  vehicle_brand: [],
  vehicle_model: [],
  vehicle_version: [],
  upload_photo: false,
  success: false,
  error: {},
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

    case actionTypes.UPLOAD_PHOTO:
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          vehicle_photos: [...state.vehicle.vehicle_photos, payload],
        },
      };

    case actionTypes.DELETE_PHOTO:
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          vehicle_photos: state.vehicle.vehicle_photos.filter(
            (photo) => photo.id !== payload
          ),
        },
      };

    case actionTypes.REORDER_PHOTO:
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          vehicle_photos: payload,
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
