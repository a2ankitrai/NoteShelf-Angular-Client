import { Injectable } from '@angular/core';
import { LoggedInUser } from '../model/logged-in-user.model';
import { HttpHeaders } from '@angular/common/http';
import * as AppConstant from 'src/app/common/constant/app-constant';


@Injectable({
  providedIn: 'root'
})
export class NsCommonService {

  // create a common class containing logged in user data add it here rather than adding fields individually.

  sessionToken: string;
  loginResponse: string;

  public user: LoggedInUser;


  constructor() { }

  getSessionToken() {
    return this.sessionToken;
  }

  setCommonHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set(AppConstant.X_AUTH_TOKEN, this.getSessionToken());
    return headers;
  }

}
