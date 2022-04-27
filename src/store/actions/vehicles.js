import axios from 'axios';
import { vehicles } from '../../mocks/vehicles';

import { showLoading } from './loading';
import { showNotify } from './notify';

export const actionTypes = {
  INDEX: 'VEHICLE_INDEX',
  UPDATE: 'VEHICLE_UPDATE',
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
  console.log(query);

  try {
    dispatch(indexResponse(vehicles.data, isLoadMore));
  } catch (error) {
    console.log(error);
  }
};

export const store = () => async (dispatch) => {
  try {
    dispatch(indexResponse(vehicles.data));
  } catch (error) {
    console.log(error);
  }
};

export const show = (id) => async (dispatch) => {
  console.log(id);

  try {
    dispatch(indexResponse(vehicles.data));
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
  console.log(data);

  dispatch(
    showLoading({
      open: true,
    })
  );

  dispatch(
    showLoading({
      open: false,
    })
  );
};

export const destroyResponse = (payload) => ({
  type: actionTypes.DESTROY,
  payload,
});

export const destroy = (id) => async (dispatch) => {
  console.log(id);

  dispatch(destroyResponse(id));
};

export const brand = (vehicle_type) => async (dispatch) => {
  console.log(vehicle_type);

  dispatch(
    showLoading({
      open: true,
    })
  );

  try {
    dispatch(indexResponse(vehicles.data));
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
  console.log({ vehicle_type, vehicle_brand });

  dispatch(
    showLoading({
      open: true,
    })
  );

  try {
    dispatch(indexResponse(vehicles.data));
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
  console.log({ vehicle_model, vehicle_brand });

  dispatch(
    showLoading({
      open: true,
    })
  );

  try {
    dispatch(indexResponse(vehicles.data));
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

// CEP
export const cep = (zipCode) => async (dispatch) => {
  console.log(zipCode);

  try {
    if (zipCode.length > 8) {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json`
      );

      const formatedData = {
        zipCode: data.cep,
        uf: data.uf,
        city: data.localidade,
        neighborhood: data.bairro,
        street: data.logradouro,
      };

      return dispatch(change(formatedData));
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
  console.log(data);

  dispatch(indexResponse({ upload_photo: true }));

  try {
    dispatch(uploadPhotoResponse(vehicles.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(indexResponse({ upload_photo: false }));
  }
};

export const deletePhotoResponse = (payload) => ({
  type: actionTypes.DELETE_PHOTO,
  payload,
});

export const deletePhoto = (id) => async (dispatch) => {
  console.log(id);

  try {
    dispatch(deletePhotoResponse(id));
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
    dispatch(
      showNotify({
        open: true,
        msg: 'Imagem reordenada com sucesso!',
        class: 'success',
      })
    );
  } catch (error) {
    console.log(error);
  }
};
