import { notes } from '../../mocks/notes';

import { actionTypes } from '../actions/notes';

const initialState = {
  notes: {
    data: notes.data,
  },
  note: {},
};

const notesReducer = (state = initialState, { type, payload, isLoadMore }) => {
  switch (type) {
    case actionTypes.INDEX:
      if (isLoadMore) {
        payload.notes.data = [...state.notes.data, ...payload.notes.data];
      }

      return { ...state, ...payload };

    case actionTypes.STORE:
      state.notes.total = state.notes.total + 1;

      return {
        ...state,
        notes: {
          ...state.notes,
          data: [...[payload], ...state.notes.data],
        },
      };

    case actionTypes.UPDATE:
      let index = state.notes.data.findIndex((item) => item.id === payload.id);
      state.notes.data[index] = payload;

      return {
        ...state,
        notes: {
          ...state.notes,
          data: state.notes.data,
        },
      };

    case actionTypes.DESTROY:
      state.notes.total = state.notes.total - 1;

      return {
        ...state,
        notes: {
          ...state.notes,
          data: state.notes.data.filter((item) => item.id !== payload),
        },
      };

    case actionTypes.CHANGE:
      return {
        ...state,
        note:
          payload === 'clear'
            ? {}
            : {
                ...state.note,
                ...payload,
              },
      };

    default:
      return state;
  }
};

export default notesReducer;
