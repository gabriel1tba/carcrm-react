import { apiAuth } from '../../services/api';

export const actionTypes = {
  INDEX: 'TRANSACTIONS_INDEX',
};

// INDEX

export const indexResponse = (payload, isLoadMore) => ({
  type: actionTypes.INDEX,
  payload,
  isLoadMore,
});

export const index = (query, isLoadMore) => async (dispatch) => {
  try {
    const response = await apiAuth.get(
      `/transactions?${new URLSearchParams(query)}`
    );
    return (
      typeof response !== 'undefined' &&
      dispatch(indexResponse(response.data, isLoadMore))
    );
  } catch (error) {
    console.log(error);
  }
};

// SHOW

export const show = (id) => async (dispatch) => {
  try {
    const response = await apiAuth.get(`/transactions/${id}`);
    return (
      typeof response !== 'undefined' && dispatch(indexResponse(response.data))
    );
  } catch (error) {
    console.log(error);
  }
};
