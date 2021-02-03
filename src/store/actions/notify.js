export const actionTypes = {
  SHOW_NOTIFY: 'SHOW_NOTIFY',
};

export const showNotify = (payload) => ({
  type: actionTypes.SHOW_NOTIFY,
  payload,
});
