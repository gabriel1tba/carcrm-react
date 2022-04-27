import { token } from '../../mocks/auth';

import { showLoading } from './loading';
import { showNotify } from './notify';

export const actionTypes = {
  EDIT: 'REGISTER_EDIT',
  ERROR: 'REGISTER_ERROR',
  SUCCESS: 'REGISTER_SUCCESS',
};

export const editRegister = (payload) => ({
  type: actionTypes.EDIT,
  payload,
});

export const errorRegister = (payload) => ({
  type: actionTypes.ERROR,
  payload,
});

export const successRegister = (payload) => ({
  type: actionTypes.SUCCESS,
  payload,
});

export const setUserToken = (token) => (dispatch) => {
  localStorage.setItem('@CARCRM:Token', token);

  dispatch(
    editRegister({
      name: '',
      email: '',
      password: '',
    })
  );

  dispatch(successRegister(true));
};

export const register = (data) => async (dispatch) => {
  dispatch(
    showLoading({
      open: true,
      msg: 'Cadastrando usuário...',
    })
  );

  try {
    dispatch(
      showLoading({
        open: false,
      })
    );

    if (typeof register !== 'undefined') {
      dispatch(
        showNotify({
          open: true,
          class: 'success',
          msg: 'Usuário cadastrado com sucesso',
        })
      );

      dispatch(setUserToken(token.access_token));
    }
  } catch (error) {
    dispatch(
      showLoading({
        open: false,
      })
    );
    if (error.response) {
      dispatch(errorRegister(error.response.data.erros));
    }
  }
};
