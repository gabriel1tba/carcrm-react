import { apiAuth } from '../../services/api';

import { showLoading } from './loading';

export const actionTypes = {
  INDEX: 'VEHICLE_INDEX',
  DESTROY: 'VEHICLE_DESTROY',
  CHANGE: 'VEHICLE_CHANGE',
  SUCCESS: 'VEHICLE_SUCCESS',
  ERROR: 'VEHICLE_ERROR',
};

export const change = (payload) => ({
  type: actionTypes.CHANGE,
  payload,
});

export const success = (payload) => ({
  type: actionTypes.SUCCESS,
  payload,
});

export const error = (payload) => ({
  type: actionTypes.ERROR,
  payload,
});

export const indexResponse = (payload, isLoadMore) => ({
  type: actionTypes.INDEX,
  payload,
  isLoadMore,
});

export const index = (query, isLoadMore) => async (dispatch) => {
  try {
    const response = await apiAuth.get(
      `/vehicles?${new URLSearchParams(query)}`
    );

    return (
      typeof response !== 'undefined' &&
      dispatch(indexResponse(response.data, isLoadMore))
    );
  } catch (error) {
    console.log(error);
  }
};

export const store = () => async (dispatch) => {
  try {
    const response = await apiAuth.post('/vehicles');

    return (
      typeof response !== 'undefined' && dispatch(indexResponse(response.data))
    );
  } catch (error) {
    console.log(error);
  }
};

export const show = (id) => async (dispatch) => {
  try {
    const response = await apiAuth.get(`/vehicles/${id}`);

    return (
      typeof response !== 'undefined' && dispatch(indexResponse(response.data))
    );
  } catch (error) {
    console.log(error);
  }
};

export const update = (data) => async (dispatch) => {
  dispatch(
    showLoading({
      open: true,
    })
  );

  const response = await apiAuth.put(`/vehicles/${data.id}`, data);

  dispatch(
    showLoading({
      open: false,
    })
  );

  if (typeof response !== 'undefined') {
    if (response.data.error) {
      dispatch(success(false));
      dispatch(error(response.data.error));
    }

    if (response.data.status === 200) {
      dispatch(success(true));
    }
  }
};

export const destroyResponse = (payload) => ({
  type: actionTypes.DESTROY,
  payload,
});

export const destroy = (id) => async (dispatch) => {
  const response = await apiAuth.delete(`/vehicles/${id}`);

  if (typeof response !== 'undefined') {
    if (response.data.status === 200) {
      dispatch(destroyResponse(id));
    }
  }
};

export const cep = (zipCode) => async (dispatch) => {
  if (zipCode.length > 8) {
    const response = await apiAuth.post('webservice/cep', {
      cep: zipCode,
    });

    return typeof response !== 'undefined' && dispatch(change(response.data));
  }
};
