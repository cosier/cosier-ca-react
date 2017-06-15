import {createReducer} from 'utils';

import * as Consts from 'consts';
/* import Logger from 'utils/Logger';*/
/* const Log = Logger.create('UploadReducer')*/

const initialState = {
  indexLoading: true,
  loading: {},

  deleted: {},
  processing: {},
  saved: {},

  db: {},

  new_list_participant_modal: {
    open: true,
    participant_id: null,
    processing: false,
    response: null,
    failure: null,
  }

};

export const listReducer = createReducer(initialState, {

  // =======================================================
  [Consts.LIST_INDEX_LOADED]: (state, entries) => {
    let db = state.db
    let loading = state.loading

    for (let item of entries) {
      db[item.id] = item
    }

    return {
      ...state,
      db: db,
      indexLoading: null
    };
  },

  [Consts.LISTS_LOADED]: (state, lists) => {
    let db = state.db
    let loading = state.loading

    for (let list of lists) {
      if (!list.id) {
        throw new Error('Invalid List.id in lists collection');
      }

      db[list.id] = list
      loading[list.id] = null
      delete loading[list.id];
    }

    return {
      ...state,
      db: db,
      loading: loading,
      indexLoading: null,
    };
  },

  [Consts.LIST_ITEM_LOADED]: (state, list) => {
    let db = state.db
    let loading = state.loading

    if (!list.id) {
      /* throw new Error('Invalid List.id')*/
    }

    db[list.id] = list
    loading[list.id] = null
    delete loading[list.id]

    return {
      ...state,
      db: db,
      loading: loading,
      indexLoading: null,
    };
  },

  [Consts.LISTS_EMPTY]: (state, entries) => {
    return {
      ...state,
      indexLoading: null,
      indexEmpty: true,
      loading: {}
    }
  },


  // =======================================================
  [Consts.LIST_INDEX]: (state, list_id) => {
    let loading = null
    if (Object.keys(state.db).length == 0) {
      if (!state.indexEmpty) {
        loading = true;
      }
    }

    return {
      ...state,
      indexLoading: loading,
    };
  },


  // =======================================================
  [Consts.LIST_SHOW]: (state, list_id) => {
    let loading = state.loading

    if (state.db[list_id]) {
      loading[list_id] = true
    }

    return {
      ...state,
      loading: loading,
    };
  },

  [Consts.LIST_DELETE_REQUEST]: (state, list_id) => {
    const db = state.db;
    console.log('LIST_DELETE_REQUEST', list_id)
    const deleted = state.deleted

    if (db[list_id]) {
      db[list_id] = null
      deleted[list_id] = true
      delete db[list_id]
    }

    return {
      ...state,
      deleted: deleted,
      db: db
    };
  },

  // =======================================================
  [Consts.LIST_REFRESH_REQUEST]: (state, id) => {
    console.log("LIST_REFRESH_REQUEST", id)

    const db = state.db
    const list = db[id]

    if (list) {
      list.status = 'pending'
    }

    return {
      ...state,
      db: db
    }
  },

  [Consts.LIST_REFRESH_SUCCESS]: (state, id) => {
    console.log("LIST_REFRESH_SUCCESS", id)
    return state
  },

  [Consts.LIST_REFRESH_FAILURE]: (state, payload) => {
    console.log("LIST_REFRESH_FAILURE", id)
    return state
  },


  // =======================================================
  [Consts.UPLOAD_LIST_CREATE_SUCCESS]: (state, payload) => {
    let db = state.db
    db[payload.list_id] = payload.list

    return {
      ...state,
      db: db,
    };
  },

  // =======================================================
  [Consts.PARTICIPANT_FOR_NEW_LIST_START]: (state, payload) => {

    return {
      ...state,
      new_list_participant_modal: {
        participant_id: payload.participant_id,
        open: true,
      }
    };
  },

  // =======================================================
  [Consts.PARTICIPANT_FOR_NEW_LIST_FINISH]: (state, payload) => {
    return {
      ...state,
      new_list_participant_modal: {
        open: false
      }
    };
  },

  // =======================================================
  [Consts.PARTICIPANT_FOR_NEW_LIST_REQUEST]: (state, payload) => {

    return {
      ...state,
      new_list_participant_modal: {
        ...state.new_list_participant_modal,
        processing: true,
        failure: null,
      }
    };
  },

  // =======================================================
  [Consts.PARTICIPANT_FOR_NEW_LIST_RESPONSE]: (state, payload) => {

    return {
      ...state,
      new_list_participant_modal: {
        ...state.new_list_participant_modal,
        processing: false,
        new_list: payload.list,
        failure: null,
      }
    };
  },

  // =======================================================
  [Consts.PARTICIPANT_FOR_NEW_LIST_FAILURE]: (state, payload) => {
    return {
      ...state,
      new_list_participant_modal: {
        ...state.new_list_participant_modal,
        processing: false,
        new_list: null,
        failure: payload.error || payload,
      }
    };
  },


});
