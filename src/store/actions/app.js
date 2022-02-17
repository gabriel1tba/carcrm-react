import { showNotify } from './notify';
import { showLoading } from './loading';

import { apiAuth } from '../../services/api';

export const actionTypes = {
  INDEX: 'APP_INDEX',
  UPDATE: 'APP_UPDATE',
  CHANGE: 'APP_CHANGE',
  SUCCESS: 'APP_SUCCESS',
  ERROR: 'APP_ERROR',
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

export const index = () => async (dispatch) => {
  try {
    const res = await apiAuth.get('/app');
    return typeof res !== 'undefined' && dispatch(indexResponse(res.data));
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
export const update = (data) => async (dispatch) => {
  dispatch(showLoading({ open: true }));

  try {
    const res = await apiAuth.put('/app/' + data.id, data);
    if (typeof res !== 'undefined') {
      if (res.data.error) {
        dispatch(error(res.data.error));
      }

      if (res.data.status === 200) {
        dispatch(
          showNotify({
            open: true,
            msg: res.data.success,
            class: 'success',
          })
        );
        dispatch(success(true));
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};
