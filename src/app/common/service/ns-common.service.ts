import { Injectable } from '@angular/core';
import { LoggedInUser } from '../model/logged-in-user.model';

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

}
