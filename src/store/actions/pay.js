import { plans as plansMock } from '../../mocks/plans';

import { showLoading } from './loading';
import { showNotify } from './notify';

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

export const alertError = (value) => (dispatch) => {
  dispatch(showLoading({ open: false }));
  dispatch(
    showNotify({
      open: true,
      msg: Object.values(value)[0],
      class: 'error',
    })
  );
  dispatch(error(value));
};

export const plans = () => async (dispatch) => {
  try {
    dispatch(change(plansMock));
  } catch (error) {
    console.log(error);
  }
};

export const payCard = (data) => async (dispatch) => {
  console.log(data);

  dispatch(
    showLoading({
      open: true,
      msg: 'Processando pagamento...',
    })
  );

  try {
    dispatch(success(plansMock.id));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};

export const payPec = (data) => async (dispatch) => {
  console.log(data);

  dispatch(
    showLoading({
      open: true,
      msg: 'Processando pagamento...',
    })
  );

  try {
    dispatch(success(plansMock.id));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(showLoading({ open: false }));
  }
};
