import {combineReducers} from 'redux';
import {reducer as modalReducer} from 'react-redux-modal';
// import {reducer as toastrReducer} from 'react-redux-toastr';

import {
    storageReducer,
    authReducer,
    routerReducer
} from 'reducers';

import { LOCATION_CHANGE } from 'consts';

export const makeRootReducer = (asyncReducers) => {
  const reducers = {
    // router: routerReducer,
    auth: authReducer,
    modals: modalReducer,
    storage: storageReducer,
  };

  Object.assign(reducers, asyncReducers);
  return combineReducers(reducers);
};

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
