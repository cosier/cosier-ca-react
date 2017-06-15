import fetch from 'isomorphic-fetch';

import {CoreEndpoint} from 'settings';
import {UrlEncoder} from 'utils';
/* import {Logger} from 'utils/Logger';*/
import {call} from 'redux-saga/effects';
/* const Log = Logger.create('Request')*/

import * as C from 'consts';

import { NETWORK_ERROR_MESSAGE } from 'consts/errors';

/**
  * Request object namespace
  */
const Request = {};
/* const endpoint = CoreEndpoint()*/
const endpoint = '/api/v1'

/**
  * Request base functionality
  @param {String} url URL endpoint, relative or absolute.
  @param {Object} opts Configuration options
  @returns {Promise} Json response based promise chain
  */
Request.make = function(url, opts) {
  let body = null;

  if (!url.indexOf('http') >= 0) {
    // Ensure url is Prefixed with back slash
    if (!url.indexOf('/') == 0) {
      url = '/' + url;
    }
    url = `${endpoint}${url}`;
  }

  console.log('url', url)

  if (!opts.headers) { opts.headers = {}; }


  const token = store.getState().auth.token
  if (token) {
    opts.headers['Authorization'] = token
  }

  opts.headers = {
    'Accept': 'application/json',
    ...opts.headers,
  };

  if (opts && opts.body) {
    body = new FormData();
    if (opts.body.constructor.name == "File") {
      body.append('file', opts.body);

    } else {
      for (let k of Object.keys(opts.body)) {
        body.append(k, opts.body[k])
      }
    }
  }

    /* } else if (opts.body) {
     *   opts.headers['content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';
     *   body = UrlEncoder(opts.body);
     * }*/

  if (body) {
    opts.body = body;
  }

  // opts.url = url
  // return opts
  return fetch(url, opts)
    .then(
      (response)=> response.json(),
      (error)=> {
        console.error("Request: fetch error", error, url, opts)
        return {
          error: NETWORK_ERROR_MESSAGE,
          fetch_error: error.message
        }
      }
    )

    .then(
      (json)=> {
        if (json && json.error) {
          if (json.error.toLowerCase && json.error.toLowerCase().indexOf("unauthorized") >= 0) {
            if (window && window.store) {
              window.store.dispatch({ type: C.UNAUTHORIZED_REQUEST, payload: { url, opts }})
            } else {
              console.error("Request: Store dispatch mechanism not found, request unauthorized.")
            }
          } else {
            console.error("Unknown json response", json)
          }
        }

        return json
      },
      (error)=> error

    );
}

Request.get = function(url) {
  return Request.make(url, { method: 'GET'});
}

Request.post = function(url, body) {
  // return Request.make;
  return Request.make(url, { body: body, method: 'POST'})
}

Request.put = function(url, body) {
  return Request.make(url, { body: body, method: 'PUT'});
}

Request.patch = function(url, body) {
  return Request.make(url, { body: body, method: 'PATCH'});
}

Request.delete = function(url) {
  return Request.make(url, { method: 'DELETE'});
}

export default Request;
export {Request}
