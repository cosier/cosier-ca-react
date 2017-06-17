import {UserAuthWrapper as authWrapper} from 'redux-auth-wrapper';
import {Match} from 'react-router';

import Logger from 'utils/Logger';
import UrlEncoder from 'utils/url_encoder';
import Request from 'utils/request';
import {push} from 'utils/navigation';

import {Route} from 'react-router-dom';
import {Link} from 'utils/Link';

export {Logger, UrlEncoder, Request, push, Link, Match, Route};

/**
 * @return {function} func
 */
export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

/**
 * @param {object} initialState state pojo
 * @param {object} reducerMap map pojo
 * @return {function} func
 */
export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

/**
 * @param {object} response
 * @return {function} func
 */
export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

/**
 * @param {object} response
 * @return {function} func
 */
export function parseJSON(response) {
  return response.json();
}

export const requireAuthentication = authWrapper({
  authSelector: (state) => state.auth,
  predicate: (auth) => auth.isAuthenticated,
  wrapperDisplayName: 'UserIsJWTAuthenticated',
  // redirectAction: push,
});
