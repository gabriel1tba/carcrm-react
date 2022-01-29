export const actionTypes = {
  CHANGE_VIEW_LOADING: 'CHANGE_VIEW_LOADING',
};

export const showLoading = (payload) => ({
  type: actionTypes.CHANGE_VIEW_LOADING,
  payload,
});
