import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { LoggedInUser } from '../model/logged-in-user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
    this.userLoggedInSubject = new Subject<boolean>();
    this.userLoggedInObservable = this.userLoggedInSubject.asObservable();
  }

  getSessionToken() {

    if (this.sessionToken === undefined || this.sessionToken === null) {
      this.sessionToken = this.localStorageService.getItem(AppConstant.SESSION_TOKEN);
    }
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
    this.userLoggedInSubject.next(true);
  }

  getUser() {
    if (this.user === undefined) {
      this.getLoggedInUserFromSessionToken().subscribe(
        res => {
          this.setUser(res.body as LoggedInUser);
          return this.user;
        },
        err => {
          console.log(err);
          console.error('error occured while retrieving user from stored session.');
          this.localStorageService.removeItem(AppConstant.SESSION_TOKEN);
          return undefined;
        }
      );
    } else {
      return this.user;
    }
  }

  routeToSignInPage(router: Router) {
    router.navigate(['/user/sign-in']);
  }

  routeToHomePage(router: Router) {
    router.navigate(['/user/home']);
  }

  routeToIntroPage(router: Router) {
    router.navigate(['/']);
  }

  getLoggedInUserFromSessionToken() {
    const headers = this.setCommonHeaders();

    return this.http.get(AppConstant.NS_ENDPOINT + 'user/detail', { headers: headers, 'observe': 'response' });
  }

}
