import React from 'react';

import * as loginActions from 'actions/auth/LoginActions';

import {FormBase} from 'components/forms';
import Checkbox from 'material-ui/Checkbox';
import {Link} from 'utils';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {LoadingScreen} from 'components';

import Progress from 'material-ui/CircularProgress';

/**
  * LoginForm
  */
class LoginFormComponent extends FormBase {

  static propTypes = {
    errors: React.PropTypes.object.isRequired,
    loginRequest: React.PropTypes.func.isRequired,
    createError: React.PropTypes.func.isRequired,
    lastEmailAttempt: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
  }

  constructor() {
    super();

    this.fields = {
      email: 'email',
      password: 'password',
    };
  }

  defaultValue() {
    if (this.props.lastEmailAttempt) {
      return this.props.lastEmailAttempt;
    } else {
      return null;
    }
  }

  /**
    * @param {object} payload
    */
  submission(payload) {
    this.props.loginRequest(payload);
  }

  /**
   * Create Account Instead navigation
   * @param {event} e
   */
  createAccountInstead(e) {
    // if (e) { e.preventDefault() }
    // console.debug("LoginForm: Account requested instead")
  }

  loading() {
    return this.props.isProcessingLogin || !this.props.initComplete
  }

  /**
    * @return {Element} Form UI
    **/
  render() {
    if (this.loading()) {
      return (
        <div className='auth-loading'>
          <Progress/>
        </div>
      )
    }

    return (
      <div className="container-fluid">
        <form className="form-signin box-anim fade-anim">
          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="inputEmail" className="sr-only">
                Email address
              </label>
              {this.createTextField({
                 id: 'email', type: 'email',
                 label: 'Enter your Email ',
                 defaultValue: this.defaultValue(),
               })}
            </div>
            <div className="col-sm-12">
              <label htmlFor="inputPassword"
                className="sr-only">Password</label>
              {this.createTextField({id: 'password', type: 'password', label: 'Password'})}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 center">
              <div className="checkbox-container">
                <Checkbox
                  required
                  type="checkbox"
                  defaultChecked
                  id="login_remember"
                  name="accept_agreements"
                />
              </div>
              <label htmlFor="login_remember">
                Remember Me
              </label>
            </div>
          </div>

          <br />

          <div className="row">

            <div className="col-sm-12">
              <Link className="quest-opt get-free-account" to="/signup" tabIndex="-1">
                Get Free Account
              </Link>
              <button
                onClick={this.onSubmit.bind(this)}
                className="btn btn-lg btn-on-fire btn-primary btn-register"
                type="submit">
                Log In
              </button>
            </div>
          </div>

        </form>
      </div>

    );
  }
}

// ----------------------------------------------------------

const mapStateToProps = (state) => ({
  errors: state.auth.loginErrors,
  isProcessingLogin: state.auth.isProcessingLogin,
  lastEmailAttempt: state.auth.lastEmailAttempt,
  initComplete: state.storage.initComplete
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(loginActions, dispatch)
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {...stateProps, ...dispatchProps, ...ownProps}
}

export {LoginFormComponent};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps)(LoginFormComponent);
