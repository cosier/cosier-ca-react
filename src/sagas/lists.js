import * as C from 'consts';
import store from 'store2';

import {
  select, take, put, call, fork
} from 'redux-saga/effects';

import {takeEvery, delay} from 'redux-saga';
import {Request, Logger, push} from 'utils';

const log = Logger.create('ListSaga');

function* listDelete() {
  while (true) {
    const action = yield take(C.LIST_DELETE_REQUEST)
    const response = yield Request.delete('/lists/' + action.payload)

    if (!response || response.error) {
      yield put({ type: C.LIST_DELETE_FAILURE,
                  payload: response.error || response });
    } else {
      yield put({ type: C.LIST_DELETE_SUCCESS,
                  payload: response.error || response });
    }
  }
}

function* listLoader() {
  while (true) {
    const action = yield take(C.LIST_SHOW);
    const id = action.payload
    yield put(push('/lists/view/' + id));
    console.log('loading list', id)
  }
}

function* listIndexer() {
  while (true) {
    const action = yield take(C.LIST_INDEX);
    const lists = yield Request.get('lists');

    if (lists.length > 0) {
      console.log('received lists', lists);
      yield put({ type: C.LISTS_LOADED, payload: lists })
    } else {
      yield put({ type: C.LISTS_EMPTY })
    }
  }
}

function* listConfirm() {
  while (true) {
    const action = yield take(C.UPLOAD_LIST_MAPPING_CONFIRM);

    const request = {
      list_upload_id: action.payload.id,
      mapping: JSON.stringify(action.payload.mapping)
    };

    console.log("listConfirm -> request", request);

    const response = yield Request.post('lists/confirm', request);

    if (response.error){
      yield put({ type: C.UPLOAD_LIST_CREATE_FAILURE,
                  payload: { error: response.error } });
      continue;
    }

    const upload = response.list_upload;

    console.log("C.UPLOAD_LIST_CREATE_SUCCESS", response);

    yield put({
      type: C.UPLOAD_LIST_CREATE_SUCCESS,
      payload: {
        list: response.list,
        list_id: response.list.id,
        list_upload: response.list_upload,
      }
    });

    yield put(push(`/lists/view/${response.list.id}`))

  }
}

function* listRefresh() {
  while (true) {
    const action = yield take(C.LIST_REFRESH_REQUEST);
    const id = action.payload

    const response = yield Request.post(`/lists/${id}/refresh`)

    if (response.error) {
      yield put({ type: C.LIST_REFRESH_FAILURE,
                  payload: { error: response.error }})
    } else {
      yield put({ type: C.LIST_REFRESH_SUCCESS, payload: id })
    }
  }
}

function* listFileChooser() {
  while (true) {
    const fileChosen = yield take(C.UPLOAD_LIST_FILE_CHOSEN);
    console.log("fileChosen", fileChosen.payload.file)
    const file = fileChosen.payload.file

    if (!file || file.length === 0) {
      const error = "Invalid file, please try another";
      yield put({ type: C.UPLOAD_LIST_FILE_ERROR, payload: {error}});
      continue;
    }
  }
}

function* listFileUpload() {
  while (true) {
    const user_request = yield take(C.UPLOAD_LIST_FILE_REQUEST);
    const response = yield Request.post('lists/upload', user_request.payload);

    if (response.error) {
      console.log("upload_response", response.error);
      yield put({ type: C.UPLOAD_LIST_FILE_FAILURE,
                  payload: { error: response.error }});
      continue;
    }

    yield put({ type: C.UPLOAD_LIST_FILE_SUCCESS, payload: response });
  }
}

function* listCreateFromSearchParticipant() {
  while (true) {
    const request = yield take(C.PARTICIPANT_FOR_NEW_LIST_REQUEST);

    const participant_id = request.payload.participant_id
    const list_name = request.payload.list_name

    if (__DEV__) {
      console.log("list saga: received request", request)

      if (!request.payload.participant_id || !request.payload.list_name) {
        throw new Error("Invalid list_name / participant_id provided")
      }
    }

    const response = yield Request.post('lists/start_with_participant', {
      participant_id: request.payload.participant_id,
      list_name: request.payload.list_name
    });

    const list_id = response.list_id || response.list.id

    if (response.error) {
      console.log("upload_response", response.error);
      yield put({ type: C.PARTICIPANT_FOR_NEW_LIST_FAILURE,
                  payload: { error: response.error }});
      continue;
    }

    yield put({ type: C.PARTICIPANT_FOR_NEW_LIST_RESPONSE,
                payload: response });

    yield put({ type: C.LIST_PARTICIPANT_CREATE_REQUEST,
                payload: {participant_id, list_id} });

    yield put({ type: C.PARTICIPANT_FOR_NEW_LIST_FINISH });
  }
}

function* recentData() {
  let lru = 0;
  let ms = 1000;

  while(true) {
    const path = window.location.pathname
    yield call(delay, 5000);

    if (path.indexOf('/lists/view') == 0) {
      let id = path.replace('/lists/view/', '')

      if (__DEV__) {
        console.log("recent_data: processing", id)
      }

      const response = yield Request.get('lists/recent/' + lru + '?list_id=' + id)
      if (__DEV__) {
        console.log("recent_data: response", response)
      }

     if (response && !response.error && (response.lru && response.lru > lru || true)) {
        lru = response.lru || 0

       if (response.participants) {
         if (__DEV__){
           console.log('recent_data: participants', response.participants);
         }
         yield put({ type: C.PARTICIPANT_FOR_LIST_RESPONSE,
                     payload: {
                       participants: response.participants,
                       list_id: id
                     }})
       }

       if (response.lists && response.lists[0]) {
         if (__DEV__) {
           console.log('recent_data: lists', response.lists);
         }

         yield put({ type: C.LISTS_LOADED,
                     payload: response.lists})
       }
      }
    }
  }
}


/**
 * Auth saga root
 */
export default function* listSaga() {
  yield [
    /* fork(listLoader),*/
    fork(listIndexer),
    fork(listDelete),
    fork(listFileChooser),
    fork(listCreateFromSearchParticipant),
    fork(listFileUpload),
    fork(listConfirm),
    fork(listRefresh),
    fork(recentData)
  ]
}

export {listSaga}
