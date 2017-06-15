import React from 'react';
import {applyMiddleware, compose, createStore} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
  import createHistory from 'history/createBrowserHistory'

import makeRootReducer from 'store/reducers';
import createLogger from 'redux-logger';
import DevTools from 'containers/DevTools';

import createSagaMiddleware, {END} from 'redux-saga';
import {root as rootSaga} from 'sagas';

import { createPersistor, getStoredState, persistStore, autoRehydrate } from 'redux-persist'
import localForage from 'localforage'

import * as C from 'consts';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware(rootSaga);

  const middleware = [
    sagaMiddleware,
  ];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  window.consts = C

  if (__DEV__) {
    /* const devToolsExtension = window.devToolsExtension;
     * if (typeof devToolsExtension === 'function') {
     *   enhancers.push(devToolsExtension());
     * } else {
     *   enhancers.push(DevTools.instrument());
     * }*/

    /* middleware.push(createLogger);*/
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const rootReducer = makeRootReducer();
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const history = createHistory()
  console.log('createStore', 'history', history)

  if (!history.createHref) {
    history.createHref = (path)=>(path)
  }


  const store = createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    initialState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        ...middleware),

      autoRehydrate(),
      ...enhancers
    )
  );

  window.persistenceStore = persistStore(store, {
    storage: localForage,
    blacklist: ['upload', 'billing']
  }, ()=> { if (__DEV__) console.log('store: persistence rehydrated!') })

  setTimeout(()=>(
    store.dispatch({ type: C.INIT_PERSISTENCE })
  ), 1500)

  store.asyncReducers = {};

  if (window) {
    window.store = store;
  }

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  store.history  = history

  return store;
};
