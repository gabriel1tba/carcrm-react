import { transactions } from '../../mocks/transactions';

import { actionTypes } from '../actions/transactions';

const initialState = {
  transactions: {
    data: transactions.data,
  },
  transaction: {},
};
const transactionsReducer = (
  state = initialState,
  { type, payload, isLoadMore }
) => {
  switch (type) {
    case actionTypes.INDEX:
      if (isLoadMore) {
        payload.transactions.data = state.transactions.data.concat(
          payload.transactions.data
        );
      }

      return { ...state, ...payload };

    default:
      return state;
  }
};

export default transactionsReducer;
