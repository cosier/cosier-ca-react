import {createReducer} from 'utils';

import * as Consts from 'consts';
import Logger from 'utils/Logger';

const Log = Logger.create('AuthReducer')

const initialState = {
  initComplete: false
};

export const storageReducer = createReducer(initialState, {

  // =======================================================
  // Broadcast storage layer init complete
  [Consts.STORAGE_INIT_COMPLETE]: (state, payload) => {
    if (__DEV__) {
      // console.log("StorageReducer: STORAGE_INIT_COMPLETE", payload)
    }

    return {
      ...state,
      initComplete: true
    };
  },

});
