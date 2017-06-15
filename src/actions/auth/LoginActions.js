import * as C from 'consts';

/**
 * createError
 * @param {object} error
 * @return {object} Create Login Error Action
 */
export function createError(error) {
    return {type: C.FORM_LOGIN_ERROR, payload: error};
}

/**
 * removeError
 * @param {object} error
 * @return {object} Login Error Action
 */
export function removeError(error) {
    return {type: C.FORM_LOGIN_ERROR_REMOVE, payload: {field: error.field}};
}

/**
 * clearErrors
 * @param {object} error
 * @return {object} Login Clear Error ActionS
 */
export function clearErrors() {
    return {type: C.FORM_LOGIN_ERROR_CLEAR};
}

/**
 * loginSuccess
 * @param {string} token
 * @return {object} Signup Request Action
 */
export function loginSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token,
        },
    };
}


// ======================================================
// Login Authorization Management
//

/**
 * onRequest
 * @param {object} error
 * @return {object} Signup Request Action
 */
export function loginFailure(error) {
    localStorage.removeItem('token');
    return {
        type: C.LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

/**
 * loginRequest
 * @return {object} Login Request Action
 */
export function loginRequest(payload) {
    return {
      type: C.LOGIN_USER_REQUEST,
      payload,
    };
}

/**
 * logout
 * @return {object} Login Logout Action
 */
export function logoutRequest() {
    return {
        type: C.LOGOUT_USER_REQUEST,
    };
}
