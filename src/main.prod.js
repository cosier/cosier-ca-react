// import ReactDOM from 'react-dom';
import {render} from 'preact';

// import injectTapEventPlugin from 'react-tap-event-plugin';
import injectTapEventPlugin from 'preact-tap-event-plugin';

injectTapEventPlugin();

import createStore from 'store/createStore';
import rootSaga from 'sagas';

const store = createStore();


// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let renderFunc = (routerKey = null) => {
  const Root = require('./containers/Root').default
  render(<Root store={store}/>, MOUNT_NODE);
};

// ========================================================
// Go!
// ========================================================
renderFunc();

setTimeout(function(){
  store.runSaga(rootSaga)
});
