import axios from 'axios';
import { owners } from '../../mocks/owners';

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
  console.log(query);

  try {
    dispatch(indexResponse(owners.data, isLoadMore));
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
    dispatch(storeResponse(owners.data));
    dispatch(success(true));
    dispatch(
      showNotify({
        open: true,
        msg: 'Proprietário cadastrado com sucesso',
        class: 'success',
      })
    );
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};

// SHOW
export const show = (item) => async (dispacth) => {
  console.log(item);

  try {
    dispacth(indexResponse(item));
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
    dispatch(success(true));
    dispatch(
      showNotify({
        open: true,
        msg: 'Proprietário atualizado com sucesso',
        class: 'success',
      })
    );
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

// VEHICLES
export const vehiclesResponse = (payload) => ({
  type: actionTypes.VEHICLES,
  payload,
});

export const vehicles = (query, isLoadMore) => async (dispatch) => {
  console.log(query);

  try {
    dispatch(vehiclesResponse(owners.data, isLoadMore));
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
