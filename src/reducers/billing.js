import {createReducer} from 'utils';
import * as Consts from 'consts';

const initialState = {
  stripe_public_key: null,
  stripe_token: null,
  stripe_data: null,

  transactions: [],
  credits: 0.00,

  requestingTX: false,
  requestingCredits: false,
  requestingConfig: false,

  errorForCreditsRequest: null,
  errorForConfigRequest: null,
  errorForTXRequest: null,

  error: null,

  funds_processing: false,
  funds_error: null,
};

const reducer = createReducer(initialState, {

  [Consts.INIT_PERSISTENCE]: (state, payload) => {
    return {
      ...state,
      credits: null,
      error: null,

      requestingTX: false,
      requestingCredits: false,
      requestingConfig: false,

      errorForCreditsRequest: null,
      errorForConfigRequest: null,
      errorForTXRequest: null,
    }
  },

  [Consts.BILLING_CHARGE_REQUEST]: (state, payload) => {
    return {
      ...state,
      funds_error: null,
      funds_processing: true
    }
  },

  [Consts.BILLING_CHARGE_FAILURE]: (state, payload) => {
    return {
      ...state,
      funds_error: payload.error,
      funds_processing: false
    }
  },

  [Consts.BILLING_CHARGE_RESPONSE]: (state, payload) => {
    return {
      ...state,
      funds_error: null,
      funds_processing: false
    }
  },

  [Consts.BILLING_TX_REQUEST]: (state, payload) => {
    return {
      ...state,
      requestingTX: true,
      errorForTXRequest: null,
      error: null,
    }
  },

  [Consts.BILLING_TX_FAILURE]: (state, payload) => {
    if (__DEV__) console.error("BILLING_TX_FAILURE")
    return {
      ...state,
      requestingTX: false,
      errorForTXRequest: payload && payload.error || payload,
      error: payload && payload.error || payload,
    }
  },

  [Consts.BILLING_TX_RESPONSE]: (state, payload) => {
    if (__DEV__) console.log("BILLING_TX_RESPONSE", payload)
    return {
      ...state,
      requestingTX: false,
      errorForTXRequest: null,
      error: null,
      transactions: payload.transactions || payload || [],
    }
  },

  [Consts.BILLING_CREDITS_REQUEST]: (state, payload) => {
    return {
      ...state,
      requestingCredits: true,
      errorForCreditsRequest: null,
      error: null,
    }
  },

  [Consts.BILLING_CREDITS_FAILURE]: (state, payload) => {
    if (__DEV__) console.error("BILLING_CREDITS_FAILURE", payload)
    return {
      ...state,
      requestingCredits: false,
      errorForCreditsRequest: payload.error || payload,
      error: payload.error || payload,
    }
  },

  [Consts.BILLING_CREDITS_RESPONSE]: (state, payload) => {
    console.log("BILLING_CREDITS_RESPONSE", payload);
    return {
      ...state,
      requestingCredits: false,
      errorForCreditsRequest: null,
      credits: payload.balance || 0,
      balance: payload.balance || 0,
      error: null,
    }
  },

  [Consts.BILLING_STRIPE_TOKEN_REMOVAL_RESPONSE]: (state, payload) => {
    return {
      ...state,
      stripe_token: null,
      stripe_data: null
    }
  },

  [Consts.BILLING_STRIPE_TOKEN_RESPONSE]: (state, payload) => {
    if (__DEV__) console.log("BILLING_STRIPE_TOKEN_RESPONSE", payload)

    let stripe = payload
    let data = { card: {} }
    let token = null

    if (stripe && stripe.meta) {
      if (typeof stripe.meta == "string") {
        data = JSON.parse(stripe.meta)
      } else {
        data = stripe.meta
      }
    }

    if (stripe) {
      token = stripe.token
    }

    const new_state = {
      ...state,
      stripe_token: token,
    }

    if (data.card) {
      new_state.stripe_data = data.card
    }

    return new_state
  },

  [Consts.BILLING_CONFIG_REQUEST]: (state, payload) => {
    if (__DEV__) console.log("BILLING_CONFIG_REQUEST")

    const loading = state.stripe_public_key ? false : true

    return {
      ...state,
      requestingConfig: loading,
      errorForConfigRequest: null,
      error: null,
    }
  },

  [Consts.BILLING_CONFIG_FAILURE]: (state, payload) => {
    if (__DEV__) console.error("BILLING_CONFIG_FAILURE", payload)

    return {
      ...state,
      requestingConfig: false,
      errorForConfigRequest: payload && payload.error || payload,
      error: payload && payload.error || payload,
    }
  },

  [Consts.BILLING_CONFIG_RESPONSE]: (state, payload) => {
    let data   = { loading: true, card: {} }
    let stripe = payload.stripe_token
    let token  = null
    let card   = null

    if (stripe && stripe.meta && typeof stripe.meta == "string") {
      data = JSON.parse(stripe.meta)
      card = data.card

    } else if (stripe && stripe.meta) {
      data = stripe.meta
      if (data.card) {
        card = data.card
      } else {
        card = data
      }
    } else {
      console.error("unknown billing configuration", stripe)
    }

    if (stripe) {
      token = payload.stripe_token.token
    }

    if (__DEV__) console.log("BILLING_CONFIG_RESPONSE", data)

    return {
      ...state,
      stripe_public_key: payload.stripe_public_key,
      stripe_token: token,
      stripe_data: card,
      requestingConfig: false,
      errorForConfigRequest: null,
      credits: payload.credits || 0,
      transactions: payload.transactions || [],
      error: null
    }
  },

});


export const billingReducer = reducer;
