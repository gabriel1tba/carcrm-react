export const actionTypes = {
  SCREEN_NV_1: 'TOGGLE_SCREEN_NV_1',
  SCREEN_NV_2: 'TOGGLE_SCREEN_NV_2',
  SCREEN_NV_3: 'TOGGLE_SCREEN_NV_3',
};

export const toggleScreenA = (payload) => ({
  type: actionTypes.SCREEN_NV_1,
  payload,
});

export const toggleScreenB = (payload) => ({
  type: actionTypes.SCREEN_NV_2,
  payload,
});

export const toggleScreenC = (payload) => ({
  type: actionTypes.SCREEN_NV_3,
  payload,
});
