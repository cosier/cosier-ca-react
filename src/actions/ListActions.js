import * as C from 'consts';

/**
  * uploadListFile
  * @param {object} payload
  * @return {object} New List Source File Upload
  */
export function uploadListFile(payload) {
  return {type: C.UPLOAD_LIST_FILE_REQUEST, payload};
}

export function chooseListUploadFile(file) {
  return {type: C.UPLOAD_LIST_FILE_CHOSEN, payload: {file}}
}

export function removeListUploadFile() {
  return {type: C.UPLOAD_LIST_FILE_REMOVE}
}

export function changeFormStepIndex(payload) {
  return { type: C.UPLOAD_LIST_FILE_FORM_STEP, payload };
}

export function changeMapping(mapping, value){
  return { type: C.UPLOAD_LIST_MAPPING_UPDATE, payload:  {mapping, value}}
}

export function confirmMapping(fileRequest) {
  return { type: C.UPLOAD_LIST_MAPPING_CONFIRM, payload: fileRequest }
}

export function editMapping() {
  return { type: C.UPLOAD_LIST_MAPPING_EDIT }
}

export function clearUploadForm() {
  return { type: C.UPLOAD_LIST_FORM_CLEAR };
}

export function listShow(id) {
  return { type: C.LIST_SHOW, payload: id }
}

export function listIndex() {
  if (__DEV__) console.log("listAction: Index fetch")
  return { type: C.LIST_INDEX }
}

export function listEdit(id) {
  if (!id) { throw new Error("listEdit: Invalid ID provided") }
  return { type: C.LIST_EDIT, payload: id }
}

export function listDelete(id) {
  if (!id) { throw new Error("listDelete: Invalid ID provided") }
  return { type: C.LIST_DELETE_REQUEST, payload: id }
}

export function listRefresh(id) {
  if (!id) { throw new Error("listRefresh: Invalid ID provided") }
  return { type: C.LIST_REFRESH_REQUEST, payload: id }
}

export function listAddParticipant(list_id, participant_id) {
  if (!list_id || !participant_id) {
    throw new Error("listAddParticipant: Invalid ID(s) provided")
  }

  return { type: C.LIST_PARTICIPANT_CREATE_REQUEST,
           payload: {list_id, participant_id} }
}

export function listRemoveParticipant(list_id, participant_id) {
  if (!list_id || !participant_id) {
    throw new Error("listRemoveParticipant: Invalid ID(s) provided")
  }

  return { type: C.LIST_PARTICIPANT_DESTROY_REQUEST,
           payload: {list_id, participant_id} }
}

export function listUpdateParticipant(data) {
  if (!data.list_id || !data.participant_id) {
    throw new Error("listRemoveParticipant: Invalid ID(s) provided")
  }

  return {
    type: C.LIST_PARTICIPANT_UPDATE_REQUEST,
    payload: data
  }
}

export function loadParticipantsForList(list_id) {
  if (!list_id) {
    throw new Error("invalid list_id")
  }

  return { type: C.PARTICIPANT_FOR_LIST_REQUEST, payload: {list_id}}
}

export function newListWithParticipant(participant_id) {
  return { type: C.PARTICIPANT_FOR_NEW_LIST_START,
           payload: {participant_id}}
}

export function newListWithParticipantCreate(list_name, participant_id) {
  return { type: C.PARTICIPANT_FOR_NEW_LIST_REQUEST,
           payload: {list_name, participant_id}}
}

export function newListWithParticipantFinish() {
  return { type: C.PARTICIPANT_FOR_NEW_LIST_FINISH }
}
