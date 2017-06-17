import React, {Component} from 'react';
import {AppRouter} from 'components';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

import ReduxModal from 'react-redux-modal';
import ReduxToastr from 'react-redux-toastr';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from 'containers/DevTools';
import { AppContainer } from 'react-hot-loader';
import Progress from 'material-ui/CircularProgress';
import {L1} from 'components/loaders';
/**
 * AppContainer
 */
export default class Root extends Component {

  static propTypes = {
    // history: PropTypes.object.isRequired,
    // routes: PropTypes.object.isRequired,
    // routerKey: PropTypes.number,
    store: PropTypes.object.isRequired,
  }

  /**
   * Render
   * @return {Element} AppContainer
   */
  render() {
    const {routes, routerKey, store} = this.props;
    const history = store.history

    console.log("ROOT:history", history)

    if (!history.createHref) {
      return (<div style={{padding: 100, textAlign: 'center'}}><L1/></div>)
    }


    return (
      <AppContainer>
        <Provider store={store}>
          <MuiThemeProvider>
            <div>
              <AppRouter history={history}/>
            </div>
          </MuiThemeProvider>
        </Provider>
      </AppContainer>
    );
  }
}
