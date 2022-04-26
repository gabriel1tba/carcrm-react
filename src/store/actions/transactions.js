import { transactions } from '../../mocks/transactions';

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
  console.log(query);

  try {
    dispatch(indexResponse(transactions.data, isLoadMore));
  } catch (error) {
    console.log(error);
  }
};

// SHOW
export const show = (id) => async (dispatch) => {
  console.log(id);

  try {
    dispatch(indexResponse(transactions.data));
  } catch (error) {
    console.log(error);
  }
};
