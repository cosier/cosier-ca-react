import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

/* import Router from 'react-router-addons-controlled/ControlledBrowserRouter'*/
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

import { LOCATION_CHANGE } from 'consts';


class ConnectedRouter extends Component {

  static propTypes = {
    location: PropTypes.object,
    action: PropTypes.string,
    dispatch: PropTypes.func,
  }

  render() {
    /* if (!this.props.initComplete) {
     *  return (<div/>)
     * }
     */
    return(
      <Router history={history}
              location={this.props.location}
              action={this.props.action}
              onChange={(location, action)=>{
                if (action === 'SYNC') {
                  this.props.dispatch({
                    type: LOCATION_CHANGE,
                    payload: {
                      location,
                      action: this.props.action
                    }
                  });

                } else if (!window.block) {
                  // if you want to block transitions go into the console and type in
                  // `window.block = true` and transitions won't happen anymore
                  this.props.dispatch({
                    type: LOCATION_CHANGE,
                    payload: {
                      location,
                      action,
                    }
                  }, 100);

                } else {
                  console.log('blocked!') // eslint-disable-line
                }
        }}
        ><div>{this.props.children}</div></Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.router && state.router.location,
    action: state.router && state.router.action,
    initComplete: state.storage.initComplete
  };
};

export default connect(mapStateToProps)(ConnectedRouter)
