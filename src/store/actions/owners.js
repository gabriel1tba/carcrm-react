import { apiAuth } from '../../services/api';
import { showLoading } from './loading';
import { showNotify } from './notify';

export const actionTypes = {
  INDEX: 'OWNER_INDEX',
  STORE: 'OWNER_STORE',
  UPDATE: 'OWNER_UPDATE',
  DESTROY: 'OWNER_DESTROY',
  VEHICLES: 'OWNER_VEHICLES',
  CHANGE: 'OWNER_CHANGE',
  SUCCESS: 'OWNER_SUCCESS',
  ERROR: 'OWNER_ERROR',
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
export const indexResponse = (payload, isLoadMore) => ({
  type: actionTypes.INDEX,
  payload,
  isLoadMore,
});

export const index = (query, isLoadMore) => async (dispatch) => {
  try {
    const response = await apiAuth.get(`/owners?${new URLSearchParams(query)}`);

    return (
      typeof response !== 'undefined' &&
      dispatch(indexResponse(response.data, isLoadMore))
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
    const response = await apiAuth.post('/owners', data);

    if (typeof response !== 'undefined') {
      if (response.data.error) {
        dispatch(error(response.data.error));
      }

      if (response.data.id) {
        dispatch(storeResponse(response.data));
        dispatch(success(true));
        dispatch(
          showNotify({
            open: true,
            msg: 'Proprietário cadastrado com sucesso',
            class: 'success',
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};

// SHOW
export const show = (id) => async (dispacth) => {
  try {
    const response = await apiAuth.get(`/owners/${id}`);
    return (
      typeof response !== 'undefined' && dispacth(indexResponse(response.data))
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
    const response = await apiAuth.put(`/owners/${data.id}`, data);

    if (response.data.error) {
      dispatch(error(response.data.error));
    }
    if (response.data.status === 200) {
      dispatch(updateResponse(data));
      dispatch(success(true));
      dispatch(
        showNotify({
          open: true,
          msg: response.data.success,
          class: 'success',
        })
      );
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
    const response = await apiAuth.delete(`/owners/${id}`);
    return typeof response !== 'undefined' && dispatch(destroyResponse(id));
  } catch (error) {
    console.log(error);
  }
};

// VEHICLES
export const vehiclesResponse = (payload) => ({
  type: actionTypes.VEHICLES,
  payload,
});

export const vehicles = (query, isLoadMore) => async (dispatch) => {
  try {
    const response = await apiAuth.get(
      '/vehicles?' + new URLSearchParams(query)
    );
    return (
      typeof response !== 'undefined' &&
      dispatch(vehiclesResponse(response.data, isLoadMore))
    );
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
