
/**
 * Validator
 */
export default class Validator {

  /**
   * Validate Emails
   * @static
   * @param {string} email
   * @return {object} Validity result
   */
  static validateEmail(email) {
    if (email.length == 0) {
      return {validity: false, message: 'Email is required'};
    }

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return {validity: true};
    } else {
      return {validity: false, message: 'Email format is invalid'};
    }
  }

  /**
   * Validate Presence
   * @static
   * @param {string} input
   * @param {string} label optional
   * @return {object} Validity result
   */
  static validatePresence(input, label = 'Field') {
    if (input.length > 0) {
      return {validity: true};
    } else {
      return {validity: false, message: `${label} is required`};
    }
  }

  /**
   * Validate Presence
   * @static
   * @param {string} input
   * @param {string} label optional
   * @return {object} Validity result
   */
  static validatePassword(input, label = 'Password') {
    if (input.length < 6) {
      return {validity: false, message: `${label} minimum 6 characters`};
    } else {
      return {validity: true};
    }
  }

  /**
   * Validate Presence
   * @static
   * @param {string} i1
   * @param {string} i2
   * @param {string} label
   * @return {object} Validity result
   */
  static validateComparison(i1, i2, label = 'Field') {
    if (i1 != i2) {
      return {validity: false, message: `${label} does not match`};
    } else {
      return {validity: true};
    }
  }
}
