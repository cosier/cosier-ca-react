import * as C from 'consts';
import store from 'store2';

import {
  select, take, put, call, fork
} from 'redux-saga/effects';

import {takeEvery, delay} from 'redux-saga';
import {Request, Logger, push} from 'utils';
import {toastr} from 'react-redux-toastr'

const log = Logger.create('ParticipantSaga');

function* participantListUpdater() {
  while (true) {
    const action = yield take(C.LIST_PARTICIPANT_UPDATE_REQUEST);
  }
}

function* participantListAdder() {
  while (true) {
    const action = yield take(C.LIST_PARTICIPANT_CREATE_REQUEST);
    const {list_id, participant_id} = action.payload

    if (!list_id) {
      throw new Error("list_id not provided to participantListAdder!!!")
    }

    const participants = [participant_id]
    const response = yield Request.post(
      `/lists/${list_id}/participants`,
      {participants});

    if (!response || response.error) {
      throw new Error(response && response.error)
    }

    const plabel = '';
    const llabel = '';

    toastr.success(
      'List Updated', `Participant ${plabel} has been added to the List ${llabel}`
    )
  }
}

function* participantListRemover() {
  while (true) {
    const action = yield take(C.LIST_PARTICIPANT_DESTROY_REQUEST);
    toastr.success("List Updated", "Participant has been removed from the List")
  }
}

function* participantListUploadCatcher() {
  while (true) {
    const action = yield take(C.UPLOAD_LIST_CREATE_SUCCESS);
    const {list_id, participants} = action.payload

    if (!list_id) {
      throw new Error("Invalid list_id from UPLOAD_LIST_CREATE_SUCCESS")
    }

    if (participants && participants.length > 0) {
      yield put({ type: C.PARTICIPANT_FOR_LIST_RESPONSE,
                  payload: {list_id, participants}
      })
    }
  }
}

function* participantListLoader() {
  while (true) {
    const action = yield take(C.PARTICIPANT_FOR_LIST_REQUEST);
    const list_id = action.payload.list_id

    if (!list_id) {
      throw new Error("participantListLoader: invalid list_id")
    }


    const response = yield Request.get(`/lists/${list_id}`);

    if (response.error) {
      yield put({ type: C.PARTICIPANT_FOR_LIST_FAILURE,
                  payload: { error: response.error, list_id }});
      continue;
    }

    const participants = (response && response.participants) || []

    if (__DEV__) {
      console.log("participant loaded", participants)
    }

    /* delete response.participants*/

    yield put({ type: C.LIST_ITEM_LOADED,
                payload: response });
    yield put({ type: C.PARTICIPANT_FOR_LIST_RESPONSE,
                payload: {list_id, participants} });
  }
}

/**
 * Auth saga root
 */
export default function* participantSaga() {
  yield [
    fork(participantListAdder),
    fork(participantListRemover),
    fork(participantListUpdater),
    fork(participantListLoader),
    fork(participantListUploadCatcher),
  ]
}

export {participantSaga}
