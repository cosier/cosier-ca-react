import * as C from 'consts';
import {Request, push} from 'utils';

import { select, take, put, call, fork, takeLatest } from 'redux-saga/effects';
import {takeEvery, delay} from 'redux-saga';

function *captureStripeToken(action) {
  const data = action.payload
  if (__DEV__) console.log("billing saga: captureStripeToken", data)

  const payload = yield Request.post('/billing/config/token', {
    meta: JSON.stringify(data),
    token: data.id
  })

  if (payload.error) {
    const error = payload && payload.error || "Unknown error posting stripe token."
    return yield put({ type: C.BILLING_STRIPE_TOKEN_FAILURE, payload: {error} })
  }

  if (__DEV__) console.log("BILLING_STRIPE_TOKEN_RESPONSE", payload)
  yield put({ type: C.BILLING_STRIPE_TOKEN_RESPONSE, payload })
}

function *removeStripeToken(token) {
  if (__DEV__) console.log("billing saga: removeStripeToken", token)

  const payload = yield Request.post('/billing/config/token/remove', { token: token})

  if (payload.error) {
    const error = payload && payload.error || "Unknown error posting stripe token."
    return yield put({ type: C.BILLING_STRIPE_TOKEN_REMOVAL_FAILURE, payload: {error} })
  }

  if (__DEV__) console.log("BILLING_STRIPE_TOKEN_REMOVAL_RESPONSE", payload)
  yield put({ type: C.BILLING_STRIPE_TOKEN_REMOVAL_RESPONSE, payload })
}

function *requestConfig() {
  const payload = yield Request.get('/billing/config')
  if (__DEV__) console.log("billing saga: requestConfig", payload)

  if (payload.error) {
    console.error("Billing Config payload error", payload)
    const error = payload && payload.error || "Unknown error retrieving Credits balance."
    return yield put({ type: C.BILLING_CONFIG_FAILURE, payload: {error} })
  } else {
    console.log("Billing Config payload success", payload)
  }

  yield put({ type: C.BILLING_CONFIG_RESPONSE, payload })
}

function *requestBalance() {
  const payload = yield Request.get('/billing/credits')
  if (__DEV__) console.log("billing saga: requestData", payload)

  if (payload.error) {
    const error = payload && payload.error || "Unknown error retrieving Credits balance."
    return yield put({ type: C.BILLING_CREDITS_FAILURE, payload: {error} })
  }

  yield put({ type: C.BILLING_CREDITS_RESPONSE, payload })
}

function *requestCharge({ payload }) {

  const request = yield Request.post('/billing/credits/charge', { amount: payload })
  if (__DEV__) console.log("billing saga: requestData", payload)

  yield put({ type: C.BILLING_TX_REQUEST })
  yield put({ type: C.BILLING_CREDITS_REQUEST })
  yield call(delay, 1000)

  if (request.error) {
    const error = request && request.error || "Unknown error retrieving Credits balance."
    return yield put({ type: C.BILLING_CHARGE_FAILURE, payload: {error} })
  }

  yield put({ type: C.BILLING_CHARGE_RESPONSE, payload })
}


function *requestCredits() {
  const payload = yield Request.get('/billing/credits')
  if (__DEV__) console.log("billing saga: requestData", payload)

  if (payload.error) {
    const error = payload && payload.error || "Unknown error retrieving Credits balance."
    return yield put({ type: C.BILLING_CREDITS_FAILURE, payload: {error} })
  }

  yield put({ type: C.BILLING_CREDITS_RESPONSE, payload })
}

function *requestTransactions() {
  const payload = yield Request.get('/billing/tx')
  if (__DEV__) console.log("billing saga: requestTransactions", payload)

  if (!payload || payload.error) {
    const error = payload && payload.error || "Unknown error retrieving Transactions"
    return yield put({ type: C.BILLING_TX_FAILURE, payload: {error} })
  }

  yield put({ type: C.BILLING_TX_RESPONSE, payload })
}

/**
 * Auth saga root
 */
export function* billingSaga() {
  if (__DEV__) console.log("BillingSaga: init");

  yield [
    takeLatest(C.BILLING_CONFIG_REQUEST,  requestConfig),
    takeLatest(C.BILLING_CHARGE_REQUEST,  requestCharge),
    takeLatest(C.BILLING_CREDITS_REQUEST, requestBalance),
    takeLatest(C.BILLING_TX_REQUEST,      requestTransactions),
    takeLatest(C.BILLING_STRIPE_TOKEN_CAPTURE,  captureStripeToken),
    takeLatest(C.BILLING_STRIPE_TOKEN_REMOVAL,  removeStripeToken),
  ];
}

export default billingSaga;
