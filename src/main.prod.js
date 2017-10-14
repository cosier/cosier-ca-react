// import ReactDOM from 'react-dom';
import {render} from 'preact';
import React from 'react';

import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();

import createStore from 'store/createStore';
import rootSaga from 'sagas';
import {AppContainer as HotLoaderWrapper} from 'react-hot-loader';

const store = createStore();

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');
const Root = require('./containers/Root').default;

// console.log('root', Root);

// ========================================================
// Go!
// ========================================================
render((
    <HotLoaderWrapper>
        <Root store={store} />
    </HotLoaderWrapper>
), MOUNT_NODE);

setTimeout(function() {
  store.runSaga(rootSaga);
});
