
import * as C from 'consts';

export const searchRequest = (params) => {
  return {
    type: C.SEARCH_REQUEST,
    payload: params
  };
}
