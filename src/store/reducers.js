import {combineReducers} from 'redux';
// import {reducer as modalReducer} from 'react-redux-modal';
// import {reducer as toastrReducer} from 'react-redux-toastr';

import {
    storageReducer,
    authReducer,
    routerReducer
} from 'reducers';

export const makeRootReducer = (asyncReducers) => {
  const reducers = {
      storage: storageReducer,
      nav: routerReducer,
      auth: authReducer
  };

  Object.assign(reducers, asyncReducers);
  return combineReducers(reducers);
};

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
