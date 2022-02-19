import { showLoading } from './loading';
import { apiAuth } from '../../services/api';
export const actionTypes = {
  CHANGE: 'PAY_CHANGE',
  SUCCESS: 'PAY_SUCCESS',
  ERROR: 'PAY_ERROR',
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

export const plans = () => async (dispatch) => {
  try {
    const response = await apiAuth.get('/pay/plans');
    return typeof response !== 'undefined' && dispatch(change(response.data));
  } catch (error) {
    console.log(error);
  }
};
