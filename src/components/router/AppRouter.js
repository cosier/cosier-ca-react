import React, {Component} from 'react';

import {CoreLayout} from 'layouts/CoreLayout/CoreLayout';
import PropTypes from 'prop-types';

import { ConnectedRouter } from 'connected-react-router'

import {connect} from 'react-redux';
import { Route, Link } from 'utils';
import Redirect from 'react-router/Redirect';

import {
    HomeView,
    WorkView,
    SkillsView,
    BlogView,
    TalkView
} from 'views';


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

const mapStateToProps = (state)=> ({
    isAuthenticated: state.auth && state.auth.isAuthenticated,
    initComplete: true,
    first_load: state.nav.first_load
})

@connect(mapStateToProps)
class AppRouter extends Component {

    propTypes: {
        first_load: PropTypes.bool.isRequired
    }

    renderContent() {
        if (this.props.initComplete) {
            const isAuthenticated = this.props.isAuthenticated;

            return (
                <div key="pages">
                    <Route path="/" exact component={HomeView} />
                    <Route path="/work" exact component={WorkView} />
                    <Route path="/skills" exact component={SkillsView} />
                    <Route path="/contact" exact component={TalkView} />
                </div>
            )
        } else {
            return (
                <div key="empty" style={{marginTop: 100}}>
                    <a href='/'>Oops, try this...</a>
                </div>
            )
        }
    }

    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <CoreLayout first_load={this.props.first_load}>
                    {[this.renderContent()]}
                </CoreLayout>
            </ConnectedRouter>
        );
    }
}

export {AppRouter};
