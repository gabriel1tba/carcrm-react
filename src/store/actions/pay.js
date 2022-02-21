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

export const payCard = (data) => async (dispatch) => {
  dispatch(
    showLoading({
      open: true,
      msg: 'Processando pagamento...',
    })
  );

  try {
    const response = await apiAuth.post('/pay/card', data);

    if (typeof response !== 'undefined') {
      if (response.data.success) {
        dispatch(success(response.data.id));
      }
      if (response.data.error) {
        dispatch(error(response.data.error));
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};

export const payPec = (data) => async (dispatch) => {
  dispatch(
    showLoading({
      open: true,
      msg: 'Processando pagamento...',
    })
  );

  try {
    const response = await apiAuth.post('/pay/pec', data);

    if (typeof response !== 'undefined') {
      if (response.data.success) {
        dispatch(success(response.data.id));
      }
      if (response.data.error) {
        dispatch(error(response.data.error));
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};
