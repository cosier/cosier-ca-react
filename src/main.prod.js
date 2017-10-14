// import ReactDOM from 'react-dom';
import {render} from 'preact';

import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();

import createStore from 'store/createStore';
import rootSaga from 'sagas';

const store = createStore();

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');
const Root = require('./containers/Root').default

// console.log('root', Root);

// ========================================================
// Go!
// ========================================================
render(<Root store={store}/>, MOUNT_NODE);

setTimeout(function(){
  store.runSaga(rootSaga)
});
