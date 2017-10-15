import React from 'react';
import 'react-hot-loader/patch';

import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();

import {AppContainer as HotLoaderWrapper} from 'react-hot-loader';

import createStore from 'store/createStore';
import rootSaga from 'sagas';
import {render as pRender} from 'preact';

const store = createStore();
console.log(pRender);

// Render Setup ========================================================
const MOUNT_NODE = document.getElementById('root');

let renderFunc = (routerKey = null) => {
  const Root = require('./containers/Root').default;
  pRender((
    <HotLoaderWrapper>
      <Root store={store}/>
    </HotLoaderWrapper>
  ), MOUNT_NODE);
};

// Enable HMR and catch runtime errors in RedBox This code is excluded from
// production bundle
if (__DEV__ && module.hot) {
  const renderApp = renderFunc;
  const renderError = (error) => {
    console.error(error);
    const RedBox = require('redbox-react').default;
    pRender((<RedBox error={error}/>), MOUNT_NODE);
  };

  renderFunc = () => {
    try {
      renderApp(Math.random());
    } catch (error) {
      console.error(error);
      renderError(error);
    }
  };

  module
    .hot
    .accept(() => {
      // ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      return renderFunc();
    });
}

//  Go! ========================================================
renderFunc();

setTimeout(function () {
  store.runSaga(rootSaga);
});
