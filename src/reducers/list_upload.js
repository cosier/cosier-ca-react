import {createReducer} from 'utils';

import * as Consts from 'consts';
/* import Logger from 'utils/Logger';*/
/* const Log = Logger.create('UploadReducer')*/

const initialState = {
  fileChosen: null,
  fileUploaded: null,
  fileUploadInProgress: null,
  fileUploadError: null,
  fileResponse: null,
  fileError: null,

  stepIndex: 0,
  mappingConfirmed: null,
  saveInProgress: null,
  createSuccess: null,
  createFailure: null,
  createError: null,

  newListUpload: null,
};

export const listUploadReducer = createReducer(initialState, {

  // =======================================================
  [Consts.UPLOAD_LIST_CREATE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      newListUpload: payload.list_upload,
      mappingConfirmed: true,
      saveInProgress: null,
      createSuccess: true,
    }
  },

  [Consts.UPLOAD_LIST_CREATE_FAILURE]: (state, payload) => {
    return {
      ...state,
      newListUpload: null,
      mappingConfirmed: true,
      saveInProgress: null,
      createSuccess: null,
      createError: payload.error,
    };
  },

  [Consts.UPLOAD_LIST_FORM_CLEAR]: (state, payload) => {
    return {
      ...state,
      newListUpload: null,
      mappingConfirmed: true,
      saveInProgress: null,
      createSuccess: null,
      createError: null,
      fileChosen: null,
      fileUploaded: null,
      fileUploadInProgress: null,
      mappingConfirmed: null,
      stepIndex: 0,
    };
  },

  // =======================================================
  [Consts.UPLOAD_LIST_MAPPING_UPDATE]: (state, payload) => {
    const mapping = {
      ...state.fileResponse.mapping,
      [payload.mapping]: payload.value,
    };

    for (let k of Object.keys(mapping)) {
      if (mapping[k] == payload.value && k != payload.mapping) {
        mapping[k] = null
      }
    }

    return {
      ...state,
      fileResponse: {
        ...state.fileResponse,
        mapping: mapping,
      },
    };
  },

  // =======================================================
  [Consts.UPLOAD_LIST_MAPPING_EDIT]: (state, payload) => {

    return {
      ...state,
      fileResponse: {
        ...state.fileResponse,
        automapped: null,
      },
    };
  },

  // =======================================================
  [Consts.UPLOAD_LIST_MAPPING_CONFIRM]: (state, payload) => {
    return {
      ...state,
      createError: null,
      mappingConfirmed: true,
      saveInProgress: true,
      stepIndex: 2
    };
  },


  // =======================================================
  [Consts.UPLOAD_LIST_FILE_FORM_STEP]: (state, payload) => {
    return {
      ...state,
      stepIndex: payload.stepIndex,
    };
  },

  // =======================================================
  [Consts.UPLOAD_LIST_FILE_REMOVE]: (state, payload) => {
    return {
      ...state,
      newListUpload: null,
      fileChosen: null,
      fileUploaded: null,
      fileuploadInProgress: null,
      fileResponse: null,
      createSuccess: null,
      createFailure: null,
      createError: null,
    };
  },

  // =======================================================
  [Consts.UPLOAD_LIST_FILE_CHOSEN]: (state, payload) => {
    return {
      ...state,
      fileError: null,
      fileChosen: payload.file,
      fileUploaded: null,
      fileResponse: null,
      fileuploadInProgress: null,
    };
  },

  // =======================================================
  [Consts.UPLOAD_LIST_FILE_ERROR]: (state, payload) => {
    return {
      ...state,
      fileError: payload.error,
      fileChosen: null,
      fileUploaded: null,
      fileResponse: null,
      fileuploadInProgress: null,
    };
  },

  // =======================================================
  [Consts.UPLOAD_LIST_FILE_REQUEST]: (state, payload) => {
    return {
      ...state,
      fileUploadInProgress: true,
      fileResponse: null,
      stepIndex: 1
    };
  },

  [Consts.UPLOAD_LIST_FILE_SUCCESS]: (state, payload) => {
    return {
      ...state,
      fileUploadInProgress: null,
      fileUploadError: null,
      fileUploaded: true,
      fileResponse: payload,
    };
  },

  [Consts.UPLOAD_LIST_FILE_FAILURE]: (state, payload) => {
    return {
      ...state,
      stepIndex: 0,
      fileUploaded: null,
      fileResponse: null,
      fileUploadError: payload.error,
      fileUploadInProgress: null,
    };
  },

});
