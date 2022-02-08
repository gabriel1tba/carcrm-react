import { apiAuth, apiUpload } from '../../services/api';

import { showLoading } from './loading';
import { showNotify } from './notify';

export const actionTypes = {
  INDEX: 'VEHICLE_INDEX',
  DESTROY: 'VEHICLE_DESTROY',
  CHANGE: 'VEHICLE_CHANGE',
  CREATE: 'VEHICLE_CREATE',
  UPLOAD_PHOTO: 'VEHICLE_UPLOAD_PHOTO',
  DELETE_PHOTO: 'VEHICLE_DELETE_PHOTO',
  REORDER_PHOTO: 'VEHICLE_REORDER_PHOTO',
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

export const brand = (vehicle_type) => async (dispatch) => {
  dispatch(
    showLoading({
      open: true,
    })
  );

  try {
    const response = await apiAuth.get(`/vehicles/${vehicle_type}/brand`);

    return (
      typeof response !== 'undefined' && dispatch(indexResponse(response.data))
    );
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(
      showLoading({
        open: false,
      })
    );
  }
};

export const model = (vehicle_type, vehicle_brand) => async (dispatch) => {
  dispatch(
    showLoading({
      open: true,
    })
  );

  try {
    const response = await apiAuth.get(
      `/vehicles/${vehicle_type}/${vehicle_brand}/model`
    );

    return (
      typeof response !== 'undefined' && dispatch(indexResponse(response.data))
    );
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(
      showLoading({
        open: false,
      })
    );
  }
};

export const version = (vehicle_brand, vehicle_model) => async (dispatch) => {
  dispatch(
    showLoading({
      open: true,
    })
  );

  try {
    const response = await apiAuth.get(
      `/vehicles/${vehicle_brand}/${vehicle_model}/version`
    );

    return (
      typeof response !== 'undefined' && dispatch(indexResponse(response.data))
    );
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(
      showLoading({
        open: false,
      })
    );
  }
};

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

export const uploadPhotoResponse = (payload) => ({
  type: actionTypes.UPLOAD_PHOTO,
  payload,
});

export const uploadPhoto = (data) => async (dispatch) => {
  dispatch(indexResponse({ upload_photo: true }));

  try {
    const response = await apiAuth.post('upload/vehicle ', data);

    if (typeof response !== 'undefined') {
      if (response.data.error) {
        dispatch(
          showNotify({
            open: true,
            msg: response.data.error,
            class: 'error',
          })
        );

        if (response.data.id) {
          dispatch(uploadPhotoResponse(response.data));
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(indexResponse({ upload_photo: true }));
  }
};

export const deletePhotoResponse = (payload) => ({
  type: actionTypes.DELETE_PHOTO,
  payload,
});

export const deletePhoto = (id) => async (dispatch) => {
  try {
    const response = await apiAuth.delete(`upload/vehicle/${id}`);

    if (typeof response !== 'undefined') {
      if (response.data.error) {
        dispatch(
          showNotify({
            open: true,
            msg: response.data.error,
            class: 'error',
          })
        );

        if (response.data.success) {
          dispatch(deletePhotoResponse(id));
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const reorderPhotoResponse = (payload) => ({
  type: actionTypes.REORDER_PHOTO,
  payload,
});

export const reorderPhoto = (pos, data) => async (dispatch) => {
  dispatch(reorderPhotoResponse(data));

  try {
    const response = await apiAuth.put(`upload/vehicle/null`, pos);

    if (typeof response !== 'undefined') {
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
  }
};
