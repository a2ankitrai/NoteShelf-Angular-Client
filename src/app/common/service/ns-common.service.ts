import { Injectable } from '@angular/core';
import { LoggedInUser } from '../model/logged-in-user.model';
import { HttpHeaders } from '@angular/common/http';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NsCommonService {

  public sessionToken: string;
  public jwtToken: string;
  public loginResponse: string;
  public user: LoggedInUser;

  // add rxjs documentation here.
  userLoggedInObservable: Observable<boolean>;
  userLoggedInSubject: Subject<boolean>;

  constructor() {
    this.userLoggedInSubject = new Subject<boolean>();
    this.userLoggedInObservable = this.userLoggedInSubject.asObservable();
  }

  getSessionToken() {
    return this.sessionToken;
  }

  setSessionToken(token: string) {
    this.sessionToken = token;
  }

  setJwtToken(token: string) {
    this.jwtToken = token;
  }

  getJwtToken() {
    return this.jwtToken;
  }

  setCommonHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set(AppConstant.X_AUTH_TOKEN, this.getSessionToken());
    return headers;
  }

  setUser(user: LoggedInUser) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  routeToSignInPage(router: Router) {
    router.navigate(['/user/sign-in']);
  }

  routeToHomePage(router: Router) {
    router.navigate(['/user/home']);
  }

}
