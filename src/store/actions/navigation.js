export const actionTypes = {
  SCREEN_NV_1: 'TOGGLE_SCREEN_NV_1',
  SCREEN_NV_2: 'TOGGLE_SCREEN_NV_2',
  SCREEN_NV_3: 'TOGGLE_SCREEN_NV_3',
};

export const toggleScreen1 = (payload) => ({
  type: actionTypes.SCREEN_NV_1,
  payload,
});

export const toggleScreen2 = (payload) => ({
  type: actionTypes.SCREEN_NV_2,
  payload,
});

export const toggleScreen3 = (payload) => ({
  type: actionTypes.SCREEN_NV_3,
  payload,
});
