import * as C from 'consts';
import {Request, push} from 'utils';

import {takeEvery, takeLatest, delay} from 'redux-saga/effects';
import {
  select,
  take,
  put,
  call,
  fork
} from 'redux-saga/effects';

function* newUserRequest(data) {
  try {
    const started = (new Date).getTime()
    const payload = yield Request.post('accounts/create', data.payload);

    const finished = (new Date).getTime()
    const elapsed = finished - started

    /* if (elapsed < 1000) {
     *   yield call(delay, 1000 - elapsed)
     * }*/

    if (payload.error) {
      if (__DEV__) console.error("sagas:auth - payload.error", payload)
      return yield put({type: C.SIGNUP_USER_FAILURE, payload})
    }

    if (!payload.error) {
      if (__DEV__) console.log("sagas:auth - payload.success", payload)
      yield put({type: C.SIGNUP_USER_SUCCESS, payload});
    } else {
      if (__DEV__) console.error("sagas:auth - payload.error", payload)
      yield put({type: C.SIGNUP_USER_FAILURE, payload})
    }
  } catch(e) {
    if (__DEV__) console.error("sagas:auth - payload.error", e)
    yield put({type: C.SIGNUP_USER_FAILURE, payload: {error: e}})
  }
}

function* loginRequest(data) {
  try {
    const started = (new Date).getTime()
    const payload = yield call(
      Request.post, 'authentication/login', data.payload);

    const finished = (new Date).getTime()

    /* if (payload.error) {
     *   return yield put({type: C.LOGIN_USER_FAILURE, payload})
     * }
     */
    if (payload && payload.token) {
      yield put({type: C.LOGIN_USER_SUCCESS, payload})
      yield put(push('/dashboard'));

    } else {
      yield put({type: C.LOGIN_USER_FAILURE, payload})
    }

  } catch(e) {
    yield put({type: C.LOGIN_USER_FAILURE, payload: { error: e }})
  }
}

/**
 * Auth saga root
 */
export function* authSaga() {
  yield [
    takeLatest(C.LOGIN_USER_REQUEST, loginRequest),
    takeLatest(C.SIGNUP_USER_REQUEST, newUserRequest),
  ];
}

export default authSaga;
