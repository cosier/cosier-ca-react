import React, {Component} from 'react';
import {CoreLayout} from 'layouts/CoreLayout/CoreLayout';
import PropTypes from 'prop-types';

import { ConnectedRouter } from 'connected-react-router'

import {connect} from 'react-redux';
import { Route, Link } from 'utils';

import {
    HomeView,
    WorkView,
    ServicesView,
    TalkView
} from 'views';

/* import { TransitionMotion, spring } from 'react-motion';*/

import Redirect from 'react-router/Redirect';

const styles = {};

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: '65px',
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center',
};

const RouteAuthorized = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => {
                          return (isAuthenticated ? (
                          <Component {...props}/>
                          ) : (
                            <Redirect to={{
                              pathname: '/login',
                              state: { from: props.location }
                            }}/>
                          )
                          )
                            }}/>
);

const mapStateToProps = (state)=> ({
  isAuthenticated: state.auth && state.auth.isAuthenticated,
  initComplete: state.storage.initComplete
})

@connect(mapStateToProps)
class AppRouter extends Component {

  renderContent() {
    if (this.props.initComplete) {
      const isAuthenticated = this.props.isAuthenticated;

      return (
        <div key="pages">
          <Route path="/" exact component={HomeView} />
          <Route path="/work" exact component={WorkView} />
          <Route path="/services" exact component={ServicesView} />
          <Route path="/talk" exact component={TalkView} />
        </div>
      )
    } else {
      return (
          <div key="empty" style={{marginTop: 100}}>
              <a href='/'>Cosier Development.</a>
          </div>
      )
    }
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <CoreLayout>
          {[this.renderContent()]}
        </CoreLayout>
      </ConnectedRouter>
    );
  }
}

export {AppRouter};
