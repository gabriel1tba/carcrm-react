import { notes } from '../../mocks/notes';

export const actionTypes = {
  INDEX: 'NOTE_INDEX',
  STORE: 'NOTE_STORE',
  UPDATE: 'NOTE_UPDATE',
  DESTROY: 'NOTE_DESTROY',
  CHANGE: 'NOTE_CHANGE',
};

export const change = (payload) => ({
  type: actionTypes.CHANGE,
  payload,
});

// INDEX
export const indexResponse = (payload, isLoadMore) => ({
  type: actionTypes.INDEX,
  payload,
  isLoadMore,
});

export const index = (query, isLoadMore) => async (dispatch) => {
  console.log(query);

  try {
    dispatch(indexResponse(notes.data, isLoadMore));
  } catch (error) {
    console.log(error);
  }
};

// STORE
export const storeResponse = (payload) => ({
  type: actionTypes.STORE,
  payload,
});

export const store = (data) => async (dispatch) => {
  try {
    dispatch(storeResponse(data));
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
export const updateResponse = (payload) => ({
  type: actionTypes.UPDATE,
  payload,
});

export const update = (data) => async (dispatch) => {
  try {
    dispatch(updateResponse(data));
  } catch (error) {
    console.log(error);
  }
};

// DESTROY
export const destroyResponse = (payload) => ({
  type: actionTypes.DESTROY,
  payload,
});

export const destroy = (id) => async (dispatch) => {
  try {
    dispatch(destroyResponse(id));
  } catch (error) {
    console.log(error);
  }
};
