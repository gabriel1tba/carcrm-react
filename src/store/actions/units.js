import axios from 'axios';
import { units } from '../../mocks/units';

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
  console.log(query);

  try {
    dispatch(indexResponse(units));
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
  console.log(data);

  dispatch(showLoading({ open: true }));
  try {
    dispatch(storeResponse(units[0]));
    dispatch(success(true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};

// SHOW
export const show = (id) => async (dispatch) => {
  console.log(id);

  try {
    dispatch(indexResponse(units));
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

  dispatch(showLoading({ open: true }));

  try {
    dispatch(showLoading({ open: false }));
    dispatch(updateResponse(units[0]));
    dispatch(success(true));
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
  console.log(id);

  try {
    dispatch(destroyResponse(id));
  } catch (error) {
    console.log(error);
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
