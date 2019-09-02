'use strict';
import { environment } from 'src/environments/environment';

export const NS_ENDPOINT = environment.APIEndpoint;
export const APP_NAME = environment.appName;

/**
 * Request Constants
*/

export const X_AUTH_TOKEN = 'X-Auth-Token';
export const AUTHORIZATION = 'Authorization';
export const BEARER_ = 'Bearer ';

export const SESSION_TOKEN = 'SESSION_TOKEN';
export const JWT_SOCIAL_LOGIN_TOKEN = 'JWT_SOCIAL_LOGIN_TOKEN';

export const LOGGED_IN_USER = 'LOGGED_IN_USER';


export const AUTH_TYPE_APP = 'APP';

// BootStrap css constants

export const SUCCESS = 'success';
export const DANGER = 'danger';

export const ALERT_CLOSE_TIME = 5000;

// ------------- Notes Constant : start

export const PAGE_HEADER_ADD_NEW_NOTE = 'Create New Note';
export const PAGE_HEADER_EDIT_NOTE = 'Edit Note';

export const NOTES_SAVE_BUTTON = 'Save';
export const NOTES_UPDATE_BUTTON = 'Update';

export const NOTE_SAVE_SUCCESS_MESSAGE = 'Note saved successfully.';
export const NOTE_SAVE_FAILURE_MESSAGE = 'Oops! Some Error occured while saving the note. Please retry after sometime.';

export const NOTE_UPDATE_SUCCESS_MESSAGE = 'Note updated successfully.';
export const NOTE_UPDATE_FAILURE_MESSAGE = 'Oops! Some Error occured while updating the note. Please retry after sometime.';








