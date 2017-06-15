import React from 'react';

import * as signupActions from 'actions/auth/SignupActions';

import {FormBase} from 'components/forms';
import Checkbox from 'material-ui/Checkbox';
import {Link} from 'utils';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Progress from 'material-ui/CircularProgress';

/**
  * SignupForm
  */
class SignupFormComponent extends FormBase {

  constructor() {
    super();

    this.displayName = 'SignupForm';

    this.fields = {
      email: 'email',
      fullName: 'text',
      password: 'password',
      passwordConfirm: 'confirmation',
    };
  }

  /**
    * @param {object} payload
    */
  submission(payload) {
    if (!this.refs.accept_terms.isChecked()) {
      alert('Please accept the Terms of Service before proceeding');
    } else {
      /* this.props.newRequest(payload);*/
    }
  }

  defaultValue() {
    return {

    };
  }

  /**
    @return {Element} Form Element
    */
  render() {
    if (this.props.isProcessingSignup) {
      return (
        <div className="creating-new-account">
          <Progress/>
        </div>
        );
    }

    if (!this.fields) {
      throw new Error('no fields during render');
    }

    return (
      <div className="container-fluid">
        <form
          autoComplete="off"
          className="form-signin box-anim fade-anim"
          onSubmit={this.onSubmit.bind(this)}
        >
          <div className="row">
            <div className="col-sm-12">
                {this.createTextField({
                    id: 'fullName', label: 'First & Last name'})}
            </div>

            <div className="col-sm-12">
                {this.createTextField({
                    id: 'email', label: 'Email address', type: 'email'})}
            </div>

            <div className="col-sm-12">
                {this.createTextField({
                    id: 'password', label: 'Password', type: 'password'})}
            </div>

            <div className="col-sm-12">
                {this.createTextField({
                    id: 'passwordConfirm',
                    label: 'Confirm Password', type: 'password'})}
            </div>

            <div className="col-xs-6 bottom-row">
              <Link to="/login"
                    className="quest-opt existing-account" tabIndex="-1"
                    style={{position: 'relative', top: '2px'}}>
                Already have Account?
              </Link>
            </div>
            <div className="col-xs-6 bottom-row">
              <button
                  onClick={this.onSubmit.bind(this)}
                  className="btn btn-lg btn-primary btn-register"
                  style={{textAlign: 'right', float: 'right'}}
                  type="submit">
                Create Account
              </button>
            </div>
          </div>
        </form>

        <div className='row terms-row'>
          <div className="col-lg-12" style={{marginTop: '30px'}}>
            <Checkbox
                style={{display: 'inline-block', width: '60px'}}
                type="checkbox"
                className='tos-checkbox'
                required
                defaultChecked
                ref="accept_terms"
                id="accept_agreements"
                name="accept_agreements"
                tabIndex="-1"/>
            <label className=""
                   style={{
                     display: 'inline-block',
                     position: 'relative',
                     top: '-6px' }}
                   htmlFor="accept_agreements"
                   tabIndex="-1">
              Agree to our terms of service.
            </label>
          </div>
        </div>


      </div>
    );
  }
}

SignupFormComponent.propTypes = {
  newRequest: React.PropTypes.func.isRequired,
  createError: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
};

// ----------------------------------------------------------

const mapStateToProps = (state) => ({
  errors: state.auth.signupErrors,
  isProcessingSignup: state.auth.isProcessingSignup,
  lastSignupAttempt: state.auth.lastSignupAttempt,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(signupActions, dispatch),
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, stateProps, dispatchProps, ownProps);

export {SignupFormComponent};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps)(SignupFormComponent);
