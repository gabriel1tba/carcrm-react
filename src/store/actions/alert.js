export const actionTypes = {
  SHOW_ALERT: 'SHOW_ALERT',
};

export const showAlert = (payload) => ({
  type: actionTypes.SHOW_ALERT,
  payload,
});
