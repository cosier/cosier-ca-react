import 'react-hot-loader/patch';

import React from 'react';
import ReactDOM from 'react-dom';

// import injectTapEventPlugin from 'react-tap-event-plugin';
import injectTapEventPlugin from 'preact-tap-event-plugin';

injectTapEventPlugin();

import { AppContainer as HotLoaderWrapper } from "react-hot-loader"
import {render} from 'preact';

import createStore from 'store/createStore';
import rootSaga from 'sagas';


const store = createStore();

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let renderFunc = (routerKey = null) => {
  const Root = require('./containers/Root').default
  render(
    <HotLoaderWrapper>
      <Root store={store}/>
    </HotLoaderWrapper>,
    MOUNT_NODE
  );
};

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = renderFunc;
  const renderError = (error) => {
    const RedBox = require('redbox-react').default;
    render(<RedBox error={error} />, MOUNT_NODE);
  };

  renderFunc = () => {
    try {
      renderApp(Math.random());
    } catch (error) {
      console.error(error);
      renderError(error);
    }
  };

  module.hot.accept(() =>{
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    return renderFunc();
  });

  /* module.hot.accept('./reducers', () => {*/
  /* const nextReducer = require('./reducers').default*/
  /* store.replaceReducer(nextReducer)*/
  /* })*/
}

// ========================================================
// Go!
// ========================================================
renderFunc();
setTimeout(function(){
  store.runSaga(rootSaga)
});
