import { token } from '../../mocks/auth';

import { showLoading } from '../actions/loading';
import { showNotify } from '../actions/notify';

export const actionsTypes = {
  EDIT: 'AUTH_EDIT',
  SUCCESS: 'AUTH_SUCCESS',
};

export const editAuth = (payload) => ({
  type: actionsTypes.EDIT,
  payload,
});

export const successAuth = (payload) => ({
  type: actionsTypes.SUCCESS,
  payload,
});

export const setUserToken = (token) => (dispatch) => {
  localStorage.setItem('@CARCRM:Token', token);

  dispatch(
    editAuth({
      email: '',
      password: '',
    })
  );

  dispatch(successAuth(true));
};

export const login = (credentials) => (dispatch) => {
  console.log(credentials);

  dispatch(
    showLoading({
      open: true,
      msg: 'Autenticando usuário...',
    })
  );

  try {
    dispatch(setUserToken(token.access_token));

    setTimeout(() => {
      dispatch(showLoading({ open: false }));
    }, 1000);
  } catch (error) {
    dispatch(showLoading({ open: false }));

    if (typeof error.response !== 'undefined') {
      if (error.response.status === 400 || error.response.status === 404) {
        dispatch(
          showNotify({
            open: true,
            class: 'error',
            msg: 'Verifique suas credênciais',
          })
        );
      } else {
        dispatch(
          showNotify({
            open: true,
            class: 'error',
            msg: 'Erro inesperádo! Por favor, contate o administrador.',
          })
        );
      }
    }
  }
};
