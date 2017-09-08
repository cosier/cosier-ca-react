import {createReducer} from 'utils';
import jwtDecode from 'jwt-decode';

import * as Consts from 'consts';

/* import Logger from 'utils/Logger';*/
/* const Log = Logger.create('AuthReducer')*/

const initialState = {
  token: null,

  id: null,
  name: null,
  email: null,
  role: null,

  isAuthenticated: false,
  isAuthenticating: false,
  isProcessingSignup: false,
  isProcessingLogin: false,

  processingError: false,
  lastEmailAttempt: false,
  lastSignupAttempt: false,
  signupErrors: {},
  loginErrors: {},

  after_login_url: null,
};

export const authReducer = createReducer(initialState, {

  [Consts.INIT_PERSISTENCE]: (state, payload) => {
    // console.log("INIT_PERSISTENCE", state.processingError)
    return {
      ...state,
      processingError: false,
      signupErrors: {},
      loginErrors: {},
      isProcessingLogin: false,
      isProcessingSignup: false,
    }
  },

  [Consts.AFTER_LOGIN_URL]: (state, payload) => {
    return {
      ...state,
      after_login_url: payload.url
    }
  },


  [Consts.AUTH_UPDATE]: (state, payload) => {
    return {
      ...state,
      processingError: false,
      [payload.key]: payload.value
    }
  },

  [Consts.AUTH_RESTORE]: (state, payload) => {
    if (__DEV__) { console.log("Auth Reducer: AUTH_RESTORE", payload) }
    if (typeof payload == "string") {
      payload = JSON.parse(payload)
    }

    const user = jwtDecode(payload.token);
    return {
      ...state,
      ...payload,
      isAuthenticated: true,
      isAuthenticating: false,
      isProcessingLogin: false,
      isProcessingSignup: false,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  },

  [Consts.LOCATION_CHANGE]: (state, payload) => {
    return {
      ...state,
      processingError: false,
    }
  },

  // =======================================================
  // Signup server communication

  [Consts.SIGNUP_USER_REQUEST]: (state, payload) => {
    return {
      ...state,
      isAuthenticated: false,
      isProcessingSignup: true,
      processingError: false
    };
  },

  [Consts.SIGNUP_USER_SUCCESS]: (state, payload) => {
    console.log('SIGNUP_USER_SUCCESS', state, payload);
    const user = jwtDecode(payload.token);

    return {
      ...state,
      isAuthenticated: true,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: payload.token,
      isProcessingSignup: false,
      processingError: false
    };
  },

  [Consts.SIGNUP_USER_FAILURE]: (state, payload) => {
    return {
      ...state,
      processingError: payload.error || "Unknown Error",
      isProcessingSignup: false
    };
  },

  // =======================================================
  // New form signup error
  [Consts.FORM_SIGNUP_ERROR]: (state, payload) => {
    return {
      ...state,
      signupErrors: {
        ...state.signupErrors,
        [payload.field]: payload,
      },
    };
  },

  // Clear all signup errors
  [Consts.FORM_SIGNUP_ERROR_CLEAR]: (state, payload) => {
    return {
      ...state,
      signupErrors: {},
    };
  },

  // Remove a single signup error from the collection
  [Consts.FORM_SIGNUP_ERROR_REMOVE]: (state, payload) => {
    const newSignupErrors = {...state.signupErrors};

    newSignupErrors[payload.field] = null;
    delete newSignupErrors[payload.field];

    return {
      ...state,
      signupErrors: newSignupErrors,
    };
  },


  // =======================================================
  // New pre-submission login error
  [Consts.FORM_LOGIN_ERROR]: (state, payload) => {
    return {
      ...state,
      loginErrors: {
        ...state.loginErrors,
        [payload.field]: payload,
      },
    };
  },

  // Clear all login errors
  [Consts.FORM_LOGIN_ERROR_CLEAR]: (state, payload) => {
    return {
      ...state,
      loginErrors: {},
    };
  },

  // Remove single login error from the collection
  [Consts.FORM_LOGIN_ERROR_REMOVE]: (state, payload) => {
    const errors = {
      ...state.loginErrors
    };

    delete errors[payload.field];

    return {
      ...state,
      loginErrors: errors,
    };
  },

  // Outbound login request
  [Consts.LOGIN_USER_REQUEST]: (state, payload) => {
    if (__DEV__) {
      console.debug('LOGIN_USER_REQUEST', state, payload);
    }

    return {
      ...state,
      isProcessingLogin: true,
      processingError: false,
      lastEmailAttempt: payload.email
    };
  },

  // Incoming server response
  [Consts.LOGIN_USER_SUCCESS]: (state, payload) => {
    const user = jwtDecode(payload.token);
    return {
      ...state,
      isAuthenticated: true,
      token: payload.token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isProcessingLogin: false,
      processingError: false
    };
  },

  // New incoming FORM attempt error
  [Consts.LOGIN_USER_FAILURE]: (state, payload) => {
    return {
      ...state,
      processingError: payload.error,
      isProcessingLogin: false
    };
  },

  // =======================================================
  // Logout Handling
  [Consts.LOGOUT_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      name: null,
      email: null,
      role: null,
      isProcessingLogin: false,
      isProcessingSignup: false,
      lastEmailAttempt: null,
      lastSignupAttempt: null
    });
  },
});
