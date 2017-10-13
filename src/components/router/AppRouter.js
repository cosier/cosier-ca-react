import React, {Component} from 'react';

import {CoreLayout} from 'layouts/CoreLayout/CoreLayout';
import PropTypes from 'prop-types';

import {ConnectedRouter} from 'connected-react-router';

import {connect} from 'react-redux';
import Redirect from 'react-router/Redirect';
import { Switch, Route, Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {HomeView, WorkView, SkillsView, SocialView, TalkView, Missing} from 'views';


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth && state.auth.isAuthenticated,
    initComplete: state.storage.initComplete,
    first_load: state.nav.first_load
});

const PageFade = (props) => (
    <CSSTransition 
      {...props}
      classNames="tx"
      timeout={props.timeout}
      appear={true}
      mountOnEnter={true}
      unmountOnExit={true}
    />
  );

const route = (path, comp) => 
(<Route path={path} exact component={comp}/>);


const App = (props) => {
    const locationKey = props.location.pathname;

    return (
      <TransitionGroup>
        <PageFade key={locationKey} timeout={800}>
          <section className="anim-container">
            <Switch location={props.location}>
              <Route exact path="/" component={HomeView} />
              <Route exact path="/skills" component={SkillsView} />
              <Route exact path="/social" component={SocialView} />
              <Route exact path="/work" component={WorkView} />
              <Route exact path="/contact" component={TalkView} />
              <Route component={Missing} />
            </Switch>
          </section>
        </PageFade>
      </TransitionGroup>
    );
  };

@connect(mapStateToProps)
class AppRouter extends Component {
    propTypes : {
        first_load: PropTypes.bool.isRequired
    }
    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <CoreLayout initialised={this.props.initComplete}>
                    <Route path="/" component={App} />
                </CoreLayout>
            </ConnectedRouter>
        );
    }
}

export {AppRouter};
