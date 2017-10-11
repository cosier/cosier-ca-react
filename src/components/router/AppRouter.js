import React, {Component} from 'react';

import {CoreLayout} from 'layouts/CoreLayout/CoreLayout';
import PropTypes from 'prop-types';

import {ConnectedRouter} from 'connected-react-router';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {connect} from 'react-redux';
import {Route, Link} from 'utils';
import Redirect from 'react-router/Redirect';

import {HomeView, WorkView, SkillsView, BlogView, TalkView} from 'views';

const styles = {};

styles.fill = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '65px',
    bottom: 0,
};

styles.content = {
    ...styles.fill,
    top: '40px',
    textAlign: 'center',
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth && state.auth.isAuthenticated,
    initComplete: true,
    first_load: state.nav.first_load,
});

const Fade = ({children, ...props}) => (
    <CSSTransition
      {...props}
      timeout={1000}
      classNames="fade"
    >
      {children}
    </CSSTransition>
  );

  const fadeRoute = (path, comp) => (
      <Fade key={comp}>
        <Route path={path} exact component={comp}/>
      </Fade>
  )

@connect(mapStateToProps)
class AppRouter extends Component {
    propTypes : {
        first_load: PropTypes.bool.isRequired
    }

    renderContent() {
        if (this.props.initComplete) {
            return (
                <div key="pages" className='pages'>
                    <TransitionGroup component="main">
                        {fadeRoute('/', HomeView)}
                        {fadeRoute('/work', WorkView)}
                        {fadeRoute('/skills', SkillsView)}
                        {fadeRoute('/contact', TalkView)}
                    </TransitionGroup>
                </div>
            );
        }
 else {
            return (
                <div key="empty" style={{
                    marginTop: 100,
                }}>
                    <a href='/'>Oops, try this...</a>
                </div>
            );
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
