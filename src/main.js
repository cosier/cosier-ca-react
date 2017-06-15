import 'react-hot-loader/patch';

import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { AppContainer as HotLoaderWrapper } from "react-hot-loader"

import createStore from 'store/createStore';
import rootSaga from 'sagas';

window.jQuery = require('jquery');
/* window._ = require('lodash');*/

require('bootstrap-sass');
require('!style-loader!css-loader!sass-loader!./styles/core.scss');

injectTapEventPlugin();

const store = createStore();
// We need to provide custom `selectLocationState` to inform
// react-router-redux of its location.
// const history = syncHistoryWithStore(createBrowserHistory(), store, {
//   selectLocationState: (state) => state.router,
// });

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = (routerKey = null) => {
  const Root = require('./containers/Root').default
  ReactDOM.render(
    <HotLoaderWrapper>
      <Root store={store}/>
    </HotLoaderWrapper>,
    MOUNT_NODE
  );
};

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react').default;
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
  };

  render = () => {
    try {
      renderApp(Math.random());
    } catch (error) {
      console.error(error);
      renderError(error);
    }
  };

  module.hot.accept(() =>{
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    return render();
  });

  /* module.hot.accept('./reducers', () => {*/
  /* const nextReducer = require('./reducers').default*/
  /* store.replaceReducer(nextReducer)*/
  /* })*/

}

// ========================================================
// Go!
// ========================================================
render();
setTimeout(function(){
  store.runSaga(rootSaga)
});
