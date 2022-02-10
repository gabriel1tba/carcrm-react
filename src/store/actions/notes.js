import { apiAuth } from '../../services/api';

import { showNotify } from './notify';

export const actionTypes = {
  INDEX: 'NOTE_INDEX',
  STORE: 'NOTE_STORE',
  UPDATE: 'NOTE_UPDATE',
  DESTROY: 'NOTE_DESTROY',
  CHANGE: 'NOTE_CHANGE',
};

export const change = (payload) => ({
  type: actionTypes.CHANGE,
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
    const response = await apiAuth.get('/notes?' + new URLSearchParams(query));

    if (typeof response !== 'undefined') {
      dispatch(indexResponse(response.data, isLoadMore));
    }
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
  try {
    const response = await apiAuth.post('/notes', data);

    if (typeof response !== 'undefined') {
      dispatch(storeResponse(response.data));
    }
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
  try {
    const response = await apiAuth.put('/notes/' + data.id, data);

    if (typeof response !== 'undefined') {
      if (response.data.status === 200) {
        dispatch(updateResponse(data));
      }

      if (response.data.error) {
        dispatch(
          showNotify({
            open: true,
            msg: response.data.error,
            class: 'error',
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// DESTROY
export const destroyResponse = (payload) => ({
  type: actionTypes.DESTROY,
  payload,
});

export const destroy = (id) => async (dispatch) => {
  try {
    const response = await apiAuth.delete('/notes/' + id);

    if (typeof response !== 'undefined') {
      dispatch(destroyResponse(id));
    }
  } catch (error) {
    console.log(error);
  }
};
