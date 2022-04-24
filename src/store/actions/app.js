import { app } from '../../mocks/app';

import { showNotify } from './notify';
import { showLoading } from './loading';
import { showAlert } from './alert';

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
    dispatch(indexResponse(app));
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
export const update = (data) => async (dispatch) => {
  dispatch(showLoading({ open: true }));

  try {
    dispatch(
      showNotify({
        open: true,
        msg: 'Cadastrado com sucesso',
        class: 'success',
      })
    );
    dispatch(success(true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};

// UPLOAD LOGO
export const uploadLogo = (item) => async (dispatch) => {
  try {
    const response = await apiAuth.post('/upload/logo', item);
    if (typeof response !== 'undefined') {
      if (response.data.logo) {
        dispatch(
          showNotify({
            open: true,
            msg: 'Logo enviado com sucesso',
            class: 'success',
          })
        );
        dispatch(change({ logo: response.data.logo }));
      }
    }
  } catch (error) {}
};

// DESTROY LOGO
export const destroyLogo = (id) => async (dispatch) => {
  try {
    const response = await apiAuth.delete(`/upload/logo/${id}`);
    if (typeof response !== 'undefined') {
      if (response.data.status === 200) {
        dispatch(
          showNotify({
            open: true,
            msg: 'Logo apagada com sucesso',
            class: 'success',
          })
        );
        dispatch(change({ logo: null }));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// VALIDATE SUBDOMAIN
export const validateSubdomain = (value) => (dispatch) => {
  let lowercaseText = value.toLowerCase();
  if (lowercaseText.search(' ') >= 0) {
    lowercaseText = lowercaseText.replace(' ', '');
    dispatch(
      showAlert({
        open: true,
        msg: 'O endereço do seu site não pode conter espaços em branco',
        class: 'error',
      })
    );
  }

  if (lowercaseText.search('www') >= 0) {
    lowercaseText = lowercaseText.replace('www', '');
    dispatch(
      showAlert({
        open: true,
        msg: 'Digite o endereço do seu site sem o www',
        class: 'error',
      })
    );
  }

  if (lowercaseText.search('.com') >= 0) {
    lowercaseText = lowercaseText.replace('.com', '');
    dispatch(
      showAlert({
        open: true,
        msg: 'Para utilizar domínio .com clique no botão abaixo "USAR MEU DOMÍNIO"',
        class: 'error',
      })
    );
  }

  return lowercaseText
    .normalize('NFD')
    .replace(/([\u0300-\u036f]|[^0-9a-zA-Z.])/g, '');
};
