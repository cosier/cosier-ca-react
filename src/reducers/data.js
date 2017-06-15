import {createReducer} from 'utils';
import * as Consts from 'consts';

const initialState = {
  data: null,
  isFetching: false,
};

export default createReducer(initialState, {
  [Consts.RECEIVE_PROTECTED_DATA]: (state, payload) => {
    return Object.assign({}, state, {
      data: payload.data,
      isFetching: false,
    });
  },
  [Consts.FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true,
    });
  },
});
