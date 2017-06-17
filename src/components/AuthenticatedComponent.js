import React from 'react';
import {connect} from 'react-redux';
/* import {pushState} from 'redux-router';*/
import PropTypes from 'prop-types';

/**
  * Class Wrapper with Authorisation protection
  * @param {Component} Component
  * @return {Class} Component
  */
export function requireAuthentication(Component) {
    /**
       Authenticated Component
    */
    class AuthenticatedComponent extends React.Component {

        /** Component Lifecycle Mount **/
        componentWillMount() {
            this.checkAuth();
        }

        /**
           Component Lifecycle Mount
           @param {object} nextProps
        **/
        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        /** Auth checker **/
        checkAuth() {
            console.debug('check auth');

            if (!this.props.isAuthenticated) {
                console.error(
                    'User is not authenticated for this area', this.props);
                const redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(
                    pushState(null, `/login?next=${redirectAfterLogin}`));
            }
        }

        /**
           @return {Element} Wrapped Component
        **/
        render() {
            console.debug('rendering authenticated_component');

            return (
                    <div>
                    {this.props.isAuthenticated === true
                     ? <Component {...this.props} />
                     : null
                    }
                </div>
            );
        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    });

    AuthenticatedComponent.propTypes = {
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.string,
        isAuthenticated: PropTypes.bool,
    };

    return connect(mapStateToProps)(AuthenticatedComponent);
}


