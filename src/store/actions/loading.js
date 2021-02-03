export const actionTypes = {
  SHOW_LOADING: 'SHOW_LOADING',
};

export const showLoading = (payload) => ({
  type: actionTypes.SHOW_LOADING,
  payload,
});
