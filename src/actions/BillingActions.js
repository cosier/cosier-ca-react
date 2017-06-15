
import * as C from 'consts';
import {push} from 'utils';

export function requestBillingTX() {
  if (__DEV__) console.log('requestBillingTX')
  return { type: C.BILLING_TX_REQUEST }
}

export function requestBillingCredits() {
  if (__DEV__) console.log('requestBillingCredits')
  return { type: C.BILLING_CREDITS_REQUEST }
}

export function requestBillingConfig() {
  if (__DEV__) console.log('requestBillingConfig')
  return { type: C.BILLING_CONFIG_REQUEST }
}

export function requestBillingCharge(amt) {
  if (__DEV__) console.log('requestBillingCharge', amt)
  return { type: C.BILLING_CHARGE_REQUEST, payload: amt }
}

export function captureStripeToken(token) {
  if (__DEV__) console.log('stripeToken captured', token)
  return { type: C.BILLING_STRIPE_TOKEN_CAPTURE, payload: token }
}

export function removeStripeToken(token) {
  if (__DEV__) console.log('stripeToken removal request', token)
  return { type: C.BILLING_STRIPE_TOKEN_REMOVAL, payload: token }
}
