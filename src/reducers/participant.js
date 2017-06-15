import {createReducer} from 'utils';

import * as Consts from 'consts';

const initialState = {
  failures: {},
  loading: false,
  lists_loading: {},
  participants_loading: {},
  db_by_list: {},
  db: {},
};

export const participantReducer = createReducer(initialState, {
  // =======================================================
  // Search results found
  /* [Consts.LIST_ITEM_LOADED]: (state, list) => {
   *   let db = state.db

   *   return {
   *     ...state,
   *   };
   * },*/


  // =======================================================
  // Search results found
  [Consts.SEARCH_RESULTS_FOUND]: (state, payload) => {
    let db = state.db
    const results = payload.results

    for (let r of results) {
      db[r.id] = r
    }

    return {
      ...state,
      db: db
    };
  },

  // =======================================================
  [Consts.PARTICIPANT_REQUEST]: (state, {participant_id}) => {
    const loading = state.participants_loading
    loading[participant_id] = true

    return {
      ...state,
      participants_loading: loading
    }
  },

  [Consts.PARTICIPANT_RESPONSE]: (state, {participant}) => {
    const loading = state.participants_loading
    loading[participant.id] = null

    const db = state.db
    db[participant.id] = participant

    return {
      ...state,
      db: db,
      participants_loading: loading
    }
  },

  [Consts.PARTICIPANT_FAILURE]: (state, {participant_id, message}) => {
    const loading = state.participants_loading
    loading[participant.id] = null

    failures[participant_id] = message

    return {
      ...state,
      failures: failures,
      participants_loading: loading
    }
  },

  // =======================================================
  [Consts.LIST_PARTICIPANT_CREATE_REQUEST]: (state, {list_id, participant_id}) => {
    if (__DEV__) { console.log('LIST_PARTICIPANT_CREATE_REQUEST', list_id, participant_id) }
    const dbl = state.db_by_list
    const list = dbl[list_id] || {}

    if (!list[participant_id]) {
      const p = state.db[participant_id] || true;
      list[participant_id] = p
    }

    dbl[list_id] = list

    return {
      ...state,
      db_by_list: dbl
    }
  },

  // =======================================================
  [Consts.LIST_PARTICIPANT_DESTROY_REQUEST]: (state, {list_id, participant_id}) => {
    if (__DEV__) { console.log('LIST_PARTICIPANT_DESTROY_REQUEST', list_id, participant_id) }
    const db = state.db_by_list
    const list = state.db_by_list[list_id]

    list[participant_id] = null

    db[list_id] = list

    return {
      ...state,
      db_by_list: db
    }
  },


  // =======================================================
  [Consts.PARTICIPANT_FOR_LIST_REQUEST]: (state, {list_id}) => {
    let lists_loading = state.lists_loading
    lists_loading[list_id] = true

    const loading = Object.keys(lists_loading).length > 0

    return {
      ...state,
      lists_loading,
      loading: loading,
    }
  },

  [Consts.PARTICIPANT_FOR_LIST_RESPONSE]: (state, {list_id, participants}) => {
    let lists_loading = state.lists_loading
    delete lists_loading[list_id]

    const loading = Object.keys(lists_loading).length > 0

    let hash_participants = state.db_by_list[list_id] || {}
    participants.forEach((p)=>(
      hash_participants[p.id] = p
    ))

    let db = state.db_by_list
    db[list_id] = hash_participants

    /* console.log("PARTICIPANT_FOR_LIST_RESPONSE", participants)*/

    return {
      ...state,
      lists_loading,
      loading: loading,
      db_by_list: db,
    }
  },

  [Consts.PARTICIPANT_FOR_LIST_FAILURE]: (state, {list_id, error}) => {
    let failures = state.failures
    failures[list_id] = error

    let lists_loading = state.lists_loading
    delete lists_loading[list_id]

    const loading = Object.keys(lists_loading).length > 0

    return {
      ...state,
      failures,
      lists_loading,
      loading: loading,
    }
  },

});
