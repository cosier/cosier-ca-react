import {createReducer} from 'utils';

import * as Consts from 'consts';
import Logger from 'utils/Logger';

const Log = Logger.create('AuthReducer')

const initialState = {
  searchInProgress: false,
  searchAutocompleteInProgress: false,

  results: [],
  resultsAutocomplete: [],

  terms: '',
  termsAutocomplete: '',
};

export const searchReducer = createReducer(initialState, {

  // =======================================================
  // Issue new request for Search Results
  [Consts.SEARCH_REQUEST]: (state, payload) => {
    return {
      ...state,
      terms: payload.terms,
      searchInProgress: true,
    };
  },


  // =======================================================
  // Issue new request for Search Results
  [Consts.SEARCH_REQUEST]: (state, payload) => {
    return {
      ...state,
      terms: payload.terms,
      searchInProgress: true,
    };
  },

  // =======================================================
  // Search results not found
  [Consts.SEARCH_RESULTS_EMPTY]: (state, payload) => {
    console.log("SEARCH_RESULTS_EMPTY", payload)
    return {
      ...state,
      terms: payload.terms || state.terms,
      results: [],
      searchInProgress: false,
      foundCount: 0
    };
  },

  // =======================================================
  // Search results found
  [Consts.SEARCH_RESULTS_FOUND]: (state, payload) => {
    return {
      ...state,
      terms: payload.terms || state.terms,
      results: payload.results || [],
      searchInProgress: false,
      foundCount: payload.count,
    };
  },

  // =======================================================
  // Autocomplete Search results not found
  [Consts.SEARCH_RESULTS_AUTOCOMPLETE_EMPTY]: (state, payload) => {
    console.log("SEARCH_RESULTS_AUTOCOMPLETE_EMPTY", payload)
    return {
      ...state,
      termsAutocomplete: payload.terms || state.terms,
      resultsAutocomplete: payload.results || [],
      searchAutocompleteInProgress: false,
    };
  },

  // =======================================================
  // Autocomplete Search results found
  [Consts.SEARCH_RESULTS_AUTOCOMPLETE_FOUND]: (state, payload) => {
    console.log('SEARCH_RESULTS_AUTOCOMPLETE_FOUND', payload)

    return {
      ...state,
      termsAutocomplete: payload.terms || state.terms,
      resultsAutocomplete: payload.autocomplete || [],
      searchAutocompleteInProgress: false,
    };
  },

});
