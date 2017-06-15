/**
 * @fileOverview
 * @name index.js
 * @author Bailey Cosier <bailey@cosier.ca>
 * @license Unlicensed
 */

import {call, fork} from 'redux-saga/effects';

import {authSaga} from 'sagas/auth';
import {watcherSaga} from 'sagas/watcher';

/**
 * Root Saga generator
 */
export default function* root() {
  yield [
    call(watcherSaga),
    call(authSaga),
  ];
}
