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



