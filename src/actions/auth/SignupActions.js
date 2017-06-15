import * as C from 'consts';
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch';

import {checkHttpStatus, parseJSON} from 'utils';

// import {pushState} from 'redux-router';
import {signupEndpoint} from 'settings/endpoints';

/**
  * onRequest
  * @param {object} payload
  * @return {object} Signup Request Action
  */
export function newRequest(payload) {
  console.log("newRequest", payload);
  return {type: C.SIGNUP_USER_REQUEST, payload};
}

/**
  * onFailure
  * @param {object} details
  * @return {object} Signup Failure Action
  */
export function onFailure(details) {
  return {type: C.SIGNUP_USER_FAILURE, payload: details};
}

/**
  * onSubmit
  * @param {object} payload
  * @param {string} redirect
  * @return {function} Thunk
  */
export function onSubmit(payload, redirect = '/dashboard') {
  return newRequest(payload);
}

/**
  * createError
  * @param {object} error
  * @return {object} Signup Error Action
  */
export function createError(error) {
  return {type: C.FORM_SIGNUP_ERROR, payload: error};
}

/**
 * removeError
 * @param {object} error
 * @return {object} Error remove Action
 */
export function removeError(error) {
  return {type: C.FORM_SIGNUP_ERROR_REMOVE, payload: {field: error.field}};
}

/**
 * clearErrors
 * @return {object} Clear Action
 */
export function clearErrors() {
  return {type: C.FORM_SIGNUP_ERROR_CLEAR};
}
