import { apiAuth } from '../../services/api';

import { showLoading } from './loading';

export const actionTypes = {
  INDEX: 'UNIT_INDEX',
  STORE: 'UNIT_STORE',
  UPDATE: 'UNIT_UPDATE',
  DESTROY: 'UNIT_DESTROY',
  CHANGE: 'UNIT_CHANGE',
  SUCCESS: 'UNIT_SUCCESS',
  ERROR: 'UNIT_ERROR',
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

// INDEX
export const indexResponse = (payload) => ({
  type: actionTypes.INDEX,
  payload,
});

export const index = (query) => async (dispatch) => {
  try {
    const response = await apiAuth.get('/units?' + new URLSearchParams(query));
    return (
      typeof response !== 'undefined' && dispatch(indexResponse(response.data))
    );
  } catch (error) {
    console.log(error);
  }
};

// STORE
export const storeResponse = (payload) => ({
  type: actionTypes.STORE,
  payload,
});

export const store = (data) => async (dispatch) => {
  dispatch(showLoading({ open: true }));
  try {
    const response = await apiAuth.post('/units', data);
    if (response.data.error) {
      dispatch(error(response.data.error));
    }
    if (response.data.id) {
      dispatch(storeResponse(response.data));
      dispatch(success(true));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};

// SHOW
export const show = (id) => async (dispatch) => {
  try {
    const response = await apiAuth.get(`/units/${id}`);
    return (
      typeof response !== 'undefined' && dispatch(indexResponse(response.data))
    );
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
export const updateResponse = (payload) => ({
  type: actionTypes.UPDATE,
  payload,
});

export const update = (data) => async (dispatch) => {
  dispatch(showLoading({ open: true }));

  try {
    const response = await apiAuth.put(`/units/${data.id}`, data);
    dispatch(showLoading({ open: false }));
    if (typeof response !== 'undefined') {
      if (response.data.error) {
        dispatch(error(response.data.error));
      }

      if (response.data.status === 200) {
        dispatch(updateResponse(data));
        dispatch(success(true));
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};

// DESTROY
export const destroyResponse = (payload) => ({
  type: actionTypes.DESTROY,
  payload,
});

export const destroy = (id) => async (dispatch) => {
  try {
    const response = await apiAuth.delete(`/units/${id}`);
    return typeof response !== 'undefined' && dispatch(destroyResponse(id));
  } catch (error) {
    console.log(error);
  }
};

// CEP
export const cep = (zipCode) => async (dispatch) => {
  try {
    if (zipCode.length > 8) {
      const response = await apiAuth.post('webservice/cep', {
        cep: zipCode,
      });
      return typeof response !== 'undefined' && dispatch(change(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};
