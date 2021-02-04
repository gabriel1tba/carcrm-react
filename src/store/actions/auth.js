export const actionsTypes = {
  CLEAR: 'AUTH_CLEAR',
  SUCCESS: 'AUTH_SUCCESS',
};

export const clearAuth = (payload) => ({
  type: actionsTypes.CLEAR,
  payload,
});

export const successAuth = (payload) => ({
  type: actionsTypes.SUCCESS,
  payload,
});

export const setUserToken = (token) => (dispatch) => {
  localStorage.setItem('@CARCRM:Token', token);

  dispatch(
    clearAuth({
      email: '',
      password: '',
    })
  );

  dispatch(successAuth(true));
};
