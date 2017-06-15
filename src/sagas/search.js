import * as C from 'consts';
import {Request, push} from 'utils';

import { select, take, put, call, fork, takeLatest, delay } from 'redux-saga/effects';

function *searchRequestAutoComplete(terms) {
  console.log("searchRequestAutoComplete", terms)

  const payload = yield Request.post(
    '/participants/search/autocomplete',
    {terms: terms}
  )

  if (__DEV__) {
    console.log('searchResultAutoComplete payload', payload)
  }

  if (payload && payload.autocomplete && payload.autocomplete.length > 0) {
    yield put({
      type: C.SEARCH_RESULTS_AUTOCOMPLETE_FOUND,
      payload: payload
    });
  } else {
    yield put({
      type: C.SEARCH_RESULTS_AUTOCOMPLETE_EMPTY,
      payload: { terms: payload.terms } });
  }
}

function* searchRequest(data) {
  if (__DEV__) {
  console.log("searchRequest data", data)
  }

  const terms = data.payload.terms
  const scrubbed = terms.toLowerCase().trim()
                        .replace(/[^a-zA-Z0-9]+/g, "-");

  if (scrubbed != 'search') {
    yield put(push(`/search/${scrubbed}`));
  }


  /* yield fork(searchRequestAutoComplete, terms)*/

  const payload = yield Request.post(
    '/participants/search', {terms}
  )

  if (__DEV__) {
    console.log("searchRequest payload received", payload);
  }

  if (payload && payload.results && payload.results.length > 0) {
    yield put({
      type: C.SEARCH_RESULTS_FOUND,
      payload: payload
    });
  } else {
    yield put({
      type: C.SEARCH_RESULTS_EMPTY,
      payload: { terms: data.payload.terms } });
  }
}

/**
 * Auth saga root
 */
export function* searchSaga() {
  yield [
    takeLatest(C.SEARCH_REQUEST, searchRequest),
  ];
}

export default searchSaga;
