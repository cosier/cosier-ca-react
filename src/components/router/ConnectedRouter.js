import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

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
                            // block transitions manually with the console
                            // `window.block = true` and transitions won't happen
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
                }}>
            <div className='connected-router'>
                {this.props.children}
            </div>
        </Router>
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
