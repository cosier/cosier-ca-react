export Errors from 'consts/errors';

//-----------------------
// Signup Form UI Actions
export const FORM_SIGNUP_ERROR = 'form_signup_error';
export const FORM_SIGNUP_ERROR_CLEAR = 'form_signup_error_clear';
export const FORM_SIGNUP_ERROR_REMOVE = 'form_signup_error_remove';

//-----------------------
// Login Form UI Actions
export const FORM_LOGIN_ERROR = 'form_login_error';
export const FORM_LOGIN_ERROR_CLEAR = 'form_signup_error_clear';
export const FORM_LOGIN_ERROR_REMOVE = 'form_login_error_remove';

//-----------------------
// Authentication Data
export const LOGIN_USER_REQUEST = 'login_user_request';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAILURE = 'login_user_failure';

export const LOGOUT_USER_REQUEST = 'logout_user_request';
export const LOGOUT_USER_SUCCESS = 'logout_user_success';

export const SIGNUP_USER_REQUEST = 'signup_user_request';
export const SIGNUP_USER_SUCCESS = 'signup_user_success';
export const SIGNUP_USER_FAILURE = 'signup_user_failure';

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const SEARCH_REQUEST = 'search_request';
export const SEARCH_RESULTS_EMPTY = 'search_results_empty';
export const SEARCH_RESULTS_FOUND = 'search_results_found';
export const SEARCH_RESULTS_CLEAR = 'search_results_clear';

export const SEARCH_RESULTS_AUTOCOMPLETE_EMPTY = 'search_results_autocomplete_empty';
export const SEARCH_RESULTS_AUTOCOMPLETE_FOUND = 'search_results_autocomplete_found';
export const SEARCH_RESULTS_AUTOCOMPLETE_CLEAR = 'search_results_autocomplete_clear';

export const LAST_EMAIL_ATTEMPT = 'auth.last_email_attempt';
export const LAST_SIGNUP_ATTEMPT = 'auth.last_signup_attempt';

export const STORAGE_INIT_COMPLETE = 'storage.init.complete';

export const AUTH_UPDATE = 'auth.update';
export const AUTH_RESTORE = 'auth.restore';
export const AUTH_CREDS_STORAGE = 'auth.creds_storage';

export const UPLOAD_LIST_FILE_CHOSEN = 'upload_list_file_chosen';
export const UPLOAD_LIST_FILE_REQUEST = 'upload_list_file_request';
export const UPLOAD_LIST_FILE_SUCCESS = 'upload_list_file_success';
export const UPLOAD_LIST_FILE_FAILURE = 'upload_list_file_failure';
export const UPLOAD_LIST_FILE_ERROR = 'upload_list_file_error';
export const UPLOAD_LIST_FILE_REMOVE = 'upload_list_file_remove';
export const UPLOAD_LIST_FILE_FORM_STEP = 'upload_list_file_form_step';

export const UPLOAD_LIST_MAPPING_EDIT = 'upload_list_mapping_edit';
export const UPLOAD_LIST_MAPPING_UPDATE = 'upload_list_mapping_update';
export const UPLOAD_LIST_MAPPING_CONFIRM = 'upload_list_mapping_confirm';
export const UPLOAD_LIST_CREATE_SUCCESS = 'upload_list_create_success';
export const UPLOAD_LIST_CREATE_FAILURE = 'upload_list_create_failure';
export const UPLOAD_LIST_FORM_CLEAR = 'upload_list_form_clear';

export const LIST_SHOW  = 'list_show';
export const LIST_EDIT  = 'list_edit';
export const LIST_INDEX = 'list_index';
export const LIST_DELETE_REQUEST = 'list_delete_request';
export const LIST_DELETE_SUCCESS = 'list_delete_success';
export const LIST_DELETE_FAILURE = 'list_delete_failure';

export const LIST_ITEM_LOADED = 'list_item_loaded';
export const LIST_COLLECTION_LOADED = 'list_collection_loaded';
export const LIST_INDEX_LOADED = 'list_index_loaded';
export const LISTS_EMPTY = 'lists_empty';
export const LISTS_LOADED = 'lists_loaded';

export const LIST_REFRESH_REQUEST = 'list_refresh_request';
export const LIST_REFRESH_SUCCESS = 'list_refresh_success';
export const LIST_REFRESH_FAILURE = 'list_refresh_failure';

export const LIST_PARTICIPANT_CREATE_LIST_REQUEST  = 'list_participant_create_list_request';

export const LIST_PARTICIPANT_CREATE_REQUEST  = 'list_participant_create_request';
export const LIST_PARTICIPANT_DESTROY_REQUEST = 'list_participant_destroy_request';
export const LIST_PARTICIPANT_UPDATE_REQUEST  = 'list_participant_update_request';

export const LIST_PARTICIPANT_CREATE_RESPONSE  = 'list_participant_create_response';
export const LIST_PARTICIPANT_DESTROY_RESPONSE = 'list_participant_destroy_response';
export const LIST_PARTICIPANT_UPDATE_RESPONSE  = 'list_participant_update_response';

export const LIST_PARTICIPANT_CREATE_FAILURE  = 'list_participant_create_failure';
export const LIST_PARTICIPANT_DESTROY_FAILURE = 'list_participant_destroy_failure';
export const LIST_PARTICIPANT_UPDATE_FAILURE  = 'list_participant_update_failure';

export const PARTICIPANT_FOR_LIST_REQUEST = 'participant_for_list_request';
export const PARTICIPANT_FOR_LIST_RESPONSE = 'participant_for_list_response';
export const PARTICIPANT_FOR_LIST_FAILURE = 'participant_for_list_failure';

export const PARTICIPANT_FOR_NEW_LIST_REQUEST  = 'participant_for_new_list_request';
export const PARTICIPANT_FOR_NEW_LIST_RESPONSE = 'participant_for_new_list_response';
export const PARTICIPANT_FOR_NEW_LIST_FAILURE  = 'participant_for_new_list_failure';
export const PARTICIPANT_FOR_NEW_LIST_START    = 'participant_for_new_list_start';
export const PARTICIPANT_FOR_NEW_LIST_FINISH   = 'participant_for_new_list_finish';

export const PARTICIPANT_REQUEST = 'participant_request';
export const PARTICIPANT_RESPONSE = 'participant_response';
export const PARTICIPANT_FAILURE = 'participant_failure';

export const SUBDOMAIN_PREFIX = window.location.host.split('.')[0];

export const UNAUTHORIZED_REQUEST = 'unauthorized_requests'
export const AFTER_LOGIN_URL = 'after_login_url';

export const INIT_PERSISTENCE = 'init_persistence';

export const BILLING_CONFIG_REQUEST = 'billing_config_request';
export const BILLING_CONFIG_FAILURE = 'billing_config_failure';
export const BILLING_CONFIG_RESPONSE = 'billing_config_response';

export const BILLING_CREDITS_REQUEST = 'billing_credits_request';
export const BILLING_CREDITS_FAILURE = 'billing_credits_failure';
export const BILLING_CREDITS_RESPONSE = 'billing_credits_response';

export const BILLING_TX_REQUEST = 'billing_tx_request';
export const BILLING_TX_FAILURE = 'billing_tx_failure';
export const BILLING_TX_RESPONSE = 'billing_tx_response';

export const BILLING_STRIPE_TOKEN_CAPTURE  = 'billing_stripe_token_capture';
export const BILLING_STRIPE_TOKEN_FAILURE  = 'billing_stripe_token_failure';
export const BILLING_STRIPE_TOKEN_RESPONSE = 'billing_stripe_token_response';
export const BILLING_STRIPE_TOKEN_REMOVAL  = 'billing_stripe_token_removal';
export const BILLING_STRIPE_TOKEN_REMOVAL_FAILURE   = 'billing_stripe_token_removal_failure';
export const BILLING_STRIPE_TOKEN_REMOVAL_RESPONSE  = 'billing_stripe_token_removal_response';

export const BILLING_CHARGE_ERROR  = 'billing_charge_error';
export const BILLING_CHARGE_PROCESSING  = 'billing_charge_processing';
export const BILLING_CHARGE_REQUEST     = 'billing_charge_request';
export const BILLING_CHARGE_RESPONSE    = 'billing_charge_response';
export const BILLING_CHARGE_FAILURE     = 'billing_charge_failure';
