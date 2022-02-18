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
    const response = await apiAuth.get('/app');
    return (
      typeof response !== 'undefined' && dispatch(indexResponse(response.data))
    );
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
export const update = (data) => async (dispatch) => {
  dispatch(showLoading({ open: true }));

  try {
    const response = await apiAuth.put(`/app/${data.id}`, data);
    if (typeof response !== 'undefined') {
      if (response.data.error) {
        dispatch(error(response.data.error));
      }

      if (response.data.status === 200) {
        dispatch(
          showNotify({
            open: true,
            msg: response.data.success,
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
  const lowerText = value.toLowerCase();
  if (lowerText.search(' ') >= 0) {
    lowerText = lowerText.replace(' ', '');
    dispatch(
      showAlert({
        open: true,
        msg: 'O endereço do seu site não pode conter espaços em branco',
        class: 'error',
      })
    );
  }

  if (lowerText.search('www') >= 0) {
    lowerText = lowerText.replace('www', '');
    dispatch(
      showAlert({
        open: true,
        msg: 'Digite o endereço do seu site sem o www',
        class: 'error',
      })
    );
  }

  if (lowerText.search('.com') >= 0) {
    lowerText = lowerText.replace('.com', '');
    dispatch(
      showAlert({
        open: true,
        msg: 'Para utilizar domínio .com clique no botão abaixo "USAR MEU DOMÍNIO"',
        class: 'error',
      })
    );
  }

  return lowerText
    .normalize('NFD')
    .replace(/([\u0300-\u036f]|[^0-9a-zA-Z.])/g, '');
};
