import * as C from 'consts';
import store from 'store2';

import {
    all, select, take, put, call, fork
} from 'redux-saga/effects';

import {takeEvery, delay} from 'redux-saga';
import {Request, Logger, push} from 'utils';

import localforage from 'localforage';
window.localforage = localforage;

const log = Logger.create('WatcherSaga');

let isAuthenticated = false;
// Remove user from /login or /signup pages afer restoration
function* enforce_authenticated_paths() {
  const path = window.location.pathname.replace(/^\//, '');
  /* console.log('enforcing path', path);*/

  switch(path) {
    case 'dashboard':
    case 'lists':
      break;
    case 'login':
    case 'signup':
      /* alert(path);*/
      /* console.error('authenticated', path)*/
      /* yield put(push('/dashboard'))*/
      break;
  }
}
function* init() {

    window.scrollTo(0,0);

    let c = $('.app-container');
    $(window).on('scroll', function(e) {
        let y = window.scrollY || document.documentElement.scrollTop;

        if (y > 100) {
            c.addClass('scrolled');
        } else {
            c.removeClass('scrolled');
        }
    });

    // yield put({
    //     type: C.STORAGE_INIT_COMPLETE,
    //     payload: { initComplete: true }
    // });

    if (document && document.body){
        let b = window.jQuery(document.body)
        b.removeClass('preloading')
    }
}

function* unauthorizedRequestWatcher(){
    while (true) {
        const action = yield take(C.UNAUTHORIZED_REQUEST)
        const {url, opts} = action.payload

        if (__DEV__) {
            console.log("WatcherSaga: detected unauthorized request for", url, opts)
        }

        yield put({ type: C.LOGOUT_USER_REQUEST })
        yield put(push("/login"))
        yield put({
            type: C.AFTER_LOGIN_URL,
            payload: {url, opts}})

    }
}

function* navigationWatcher(){
    while (true) {
        const action = yield take(C.LOCATION_CHANGE)
        /* console.log("Location watch changed", action)*/
        if (isAuthenticated) {
            /* yield call(delay, 1000)*/
            yield enforce_authenticated_paths()
        }
    }
}

function* loginWatcher() {
    while (true) {
        const creds = yield take(C.LOGIN_USER_REQUEST)
        store.set(C.LAST_EMAIL_ATTEMPT, creds.payload.email);
    }
}

function* loginSuccessWatcher() {
    while (true) {
        const action = yield take(C.LOGIN_USER_SUCCESS)
        store.set(C.SUBDOMAIN_PREFIX + C.AUTH_CREDS_STORAGE, action.payload);
        isAuthenticated = true;
    }
}

function* signupSuccessWatcher() {
    while (true) {
        const action = yield take(C.SIGNUP_USER_SUCCESS)
        store.set(C.SUBDOMAIN_PREFIX + C.AUTH_CREDS_STORAGE, action.payload);
        isAuthenticated = true;
    }
}

function* logoutWatcher() {
    while (true) {
        const creds = yield take(C.LOGOUT_USER_REQUEST)
        console.log("Received LOGOUT_USER_REQUEST", creds)

        store.set(C.LAST_EMAIL_ATTEMPT, null);
        store.set(C.SUBDOMAIN_PREFIX + C.AUTH_CREDS_STORAGE, null);

        if (window && window.localStorage) {
            window.localStorage.clear()
        }

        if (window && window.persistenceStore) {
            window.persistenceStore.purge()
        }

        isAuthenticated = false;
        yield put(push('/'));
    }
}

/**
 * Auth saga root
 */
export function* watcherSaga() {
    yield all({
        init: call(init)
        // fork(loginWatcher),
        // fork(loginSuccessWatcher),
        // fork(signupSuccessWatcher),
        // fork(logoutWatcher),
        // fork(navigationWatcher),
        // fork(unauthorizedRequestWatcher),
    })
}

export default watcherSaga;
