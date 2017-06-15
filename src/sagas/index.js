/**
 * @fileOverview
 * @name index.js
 * @author Bailey Cosier <bailey@cosier.ca>
 * @license Unlicensed
 */

import {call, fork} from 'redux-saga/effects';

import {authSaga} from 'sagas/auth';
import {searchSaga} from 'sagas/search';
import {watcherSaga} from 'sagas/watcher';
import {listSaga} from 'sagas/lists';
import {participantSaga} from 'sagas/participants';
import {billingSaga} from 'sagas/billing';

/**
 * Root Saga generator
 */
export default function* root() {
  yield [
    call(billingSaga),
    call(searchSaga),
    call(listSaga),
    call(participantSaga),
    call(watcherSaga),
    call(authSaga),
  ];
}
