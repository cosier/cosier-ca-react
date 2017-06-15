import React from 'react';
import TextField from 'material-ui/TextField';

import {Validator} from 'components/forms';
import {Logger} from 'utils';

const log = Logger.create('FormBase');

/**
 * FormBase
 */
export default class FormBase extends React.Component {

  constructor() {
    super();
    this.default_values = {};
    this.current_values = {};
    this.cache = {};
  }

  /**
   * Component Lifecycle Mount
   */
  componentDidMount() {
  }


  /**
   * Render Errors
   * @return {Element} Error UI block
   */
  renderErrors() {
    const errors = this.props.errors;
    if (errors && Object.keys(errors).length > 0) {
      return (
        <div key="error-fn"
          className="alert alert-danger max-width">
          Please fill in all the required fields.
        </div>
      );
    } else {
      return (<div />);
    }
  }

  /**
   * onSubmit
   * @param {event} e
   */
  onSubmit(e) {
    e && e.preventDefault();

    let payload = {}

    for (const k in this.fields) {
      payload[k] = this.refs[k].getValue();
    }

    if (this.validateForm()) {
      log('form is valid');
      if (this.props.onSubmit){
        const onSubmitResult = this.props.onSubmit(payload);
        if (onSubmitResult) {
          this.submission(payload);
        } else {
          log.debug('onSubmit handler returned negative, aborting submission')
        }

      } else {
        this.submission(payload);
      }

    } else {
      log('form is not valid :(');
    }
  }

  /**
   * errorForInput
   * @param {string} field
   * @return {string} error class string
   */
  errorForInput(field) {
    if (this.hasError(field)) {
      return 'has-error error';
    } else {
      return 'no-error';
    }
  }

  /**
   * classForInput
   * @param {string} field
   * @return {string} error class string
   */
  classForInput(field) {
    if (this.hasError(field)) {
      return 'has-error error';
    } else {
      return 'no-error';
    }
  }

  /**
   * errorForInput
   * @param {string} field
   * @return {boolean} error result
   */
  hasError(field) {
    return this.props.errors[field];
  }


  /**
   * validateInput
   * @param {string} id
   * @param {string} val
   * @param {string} type
   * @param {string} opts
   * @return {string} error class string
   */
  validateInput(id, val, type, opts = {}) {
    const existingError = this.hasError(id);
    let validity = false;
    let message = '';

    switch (type) {
      case 'email':
        ({validity, message} = Validator.validateEmail(val));
        break;

      case 'text':
        ({validity, message} = Validator.validatePresence(val));
        break;

      case 'password':
        ({validity, message} = Validator.validatePassword(val));
        break;

      case 'confirmation':
        if (opts.password) {
          ({validity, message} = Validator.validateComparison(
            val, opts.password, 'Confirmation'));
        } else {
          ({validity, message} = Validator.validatePassword(val));
        }

        break;
    }


    if (validity && existingError) {
      this.props.removeError({field: id});
    } else if (!validity) {
      this.props.createError({
        field: id, message});
    }

    return validity;
  }

  /**
   * ValidateForm
   * @return {boolean} validation result
   */
  validateForm() {
    const opts = {password: this.refs.password.getValue()};
    let valid = true;

    if (!this.fields) {
      throw new Error('Fields not available');
    }

    if (Object.keys(this.fields).length == 0) {
      return false;
    }

    for (const k in this.fields) {
      if ({}.hasOwnProperty.call(this.fields, k)) {
        const val = this.refs[k].getValue();
        const result = this.validateInput(
          k, val, this.fields[k], opts);

        // update validity only if its currently valid.
        // therefore not overwriting existing errors
        if (valid) {
          valid = result;
        }
      }
    }

    return valid;
  }

  /**
   * Input Change
   * @param {event} e
   * @param {string} id
   * @param {string} type
   */
  onInputChange(e, id, type) {
    clearTimeout(this.cache[id]);

    const val = e.target.value;
    this.current_values[id] = val;

    let opts = {};
    if (['password', 'confirmation'].indexOf(type) >= 0) {
      opts = {password: this.refs.password.getValue()};
    }

    this.cache[id] = setTimeout(() => {
      this.validateInput(id, val, type, opts);
    }, 200);
  }

  /**
   * Create TextField
   * @param {string} id
   * @param {string} label
   * @param {string} type
   * @return {Element} TextField
   */
  createTextField({id, label, type, defaultValue}) {
    if (!type) {
      type = 'text';
    }
    const extra = {};
    let vtype = type;

    if (type == 'password') {
      extra.minLength = 6;
      if (id == 'password_confirm') {
        vtype = 'confirmation';
      }
    }

    const err = this.hasError(id);

    if (err) {
      extra.errorText = err.message;
    }
    /* if (__DEV__) {*/
      /* default_val = this.default_values[id];*/
    /* }*/

    return (
      <TextField
        ref={id}
        name={id}
        type={type}
        id={`input_${id}`}
        defaultValue={defaultValue}
        className={this.classForInput(id)}
        floatingLabelText={label}
        required {...extra}
        onChange={(e) => {
            this.onInputChange(e, id, vtype);
          }}
      />
    );
  }
}

FormBase.propTypes = {
  errors: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  createError: React.PropTypes.func,
  removeError: React.PropTypes.func,
};
