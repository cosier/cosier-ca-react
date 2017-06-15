import {Component, PropTypes} from 'react';

import {modal} from 'react-redux-modal';
import LoginModal from './Login';

// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import SelectField from 'material-ui/SelectField';
// import TextField from 'material-ui/TextField';
// import Checkbox from 'material-ui/Checkbox';
// import MenuItem from 'material-ui/MenuItem';

// import {toastr} from 'react-redux-toastr';

/**
 * SignupModal
 */
export default class SignupModal extends Component {

  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Remove modal trigger
   */
  removeThisModal() {
    this.props.removeModal();
  }

  /**
   * Open login modal
   */
  openLoginModalInstead() {
    this.removeThisModal();
    modal.add(LoginModal, {
      title: 'Sign In',
    });
  }

  /**
   * onSubmit
   * @param {event} evt
   */
  onSubmit(evt) {
      // evt.preventDefault();
      // toastr.success('Notice', 'No New Signups at this period.')
  }

  /**
   * Render
   * @return {Element} SignupForm
   */
  render() {
    return (<SignupForm onClick={this.onClick.bind(this)}
      onSubmit={this.onSubmit.bind(this)}
    />);
  }

}

SignupModal.propTypes = {
  removeModal: PropTypes.func,
};

