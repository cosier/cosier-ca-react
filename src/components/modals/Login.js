import {PropTypes, Component} from 'react';
import {modal} from 'react-redux-modal';

import SignupModal from './Signup';

/**
 * LoginModal
 */
export default class LoginModal extends Component {

  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    console.log('## MODAL DATA AND PROPS:', this.props);
  }

  /**
   * RemoveThisModal
   */
  removeThisModal() {
    this.props.removeModal();
  }

  /**
   * openSignupModalInstead
   */
  openSignupModalInstead() {
    this.removeThisModal();
    modal.add(SignupModal, {
      title: 'New Account',
    });
  }

  /**
   * onSubmit
   * @param {event} evt
   */
  onSubmit(evt) {
    evt.preventDefault();
    toastr.success('Notice', 'Invalid User');
  }

  /**
   * Render
   * @return {Element} LoginForm
   */
  render() {
    return (<LoginForm
      onClick={this.openSignupModalInstead.bind(this)}
      onSubmit={this.onSubmit.bind(this)}
    />);
  }

}

LoginModal.propTypes = {
  removeModal: PropTypes.func,
};
