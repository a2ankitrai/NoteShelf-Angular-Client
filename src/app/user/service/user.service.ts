import { NsCommonService } from 'src/app/common/service/ns-common.service';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/userlogin.model';
import { UserRegistration } from '../model/userRegistration.model';
import { LoggedInUser } from 'src/app/common/model/logged-in-user.model';
import { TokenVerificationResponse } from '../model/token-verification-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private commonService: NsCommonService) { }

  requestLogin(userLogin: UserLogin): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + btoa(userLogin.name + ':' + userLogin.password));
    headers = headers.set('Content-Type', 'application/json');

    /**
     *  {observe: 'response'}
     *  to display the full response including headers
     */
    return this.http.post(AppConstant.NS_ENDPOINT + 'user/login', null, { headers: headers, 'observe': 'response' });

  }

  requestUserRegistration(userRegistration: UserRegistration): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(AppConstant.NS_ENDPOINT + 'user/registration', userRegistration, { headers: headers, 'observe': 'response' });
  }

  getLoggedInUserFromSessionToken() {
    const headers = this.commonService.setCommonHeaders();

    return this.http.get(AppConstant.NS_ENDPOINT + 'user/detail', { headers: headers, 'observe': 'response' });
  }

  getLoggedInUserfromBearerToken(token: string): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.get(AppConstant.NS_ENDPOINT + 'user/currentUser', { headers: headers, 'observe': 'response' });
  }

  logoutUser() {
    const headers = this.commonService.setCommonHeaders();
    return this.http.post(AppConstant.NS_ENDPOINT + 'user/logout', null, { headers: headers, 'observe': 'response' });
  }

  socialSignIn(provider) {
    window.location.href = AppConstant.NS_ENDPOINT + 'oauth2/authorization/' + provider;
  }

  forgotPassword(userEmail: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(AppConstant.NS_ENDPOINT + 'user/forgot-password', userEmail, { headers: headers, 'observe': 'response' });
  }

  verifyPasswordResetToken(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(AppConstant.NS_ENDPOINT + 'user/verify-password-reset-token',
      token, { headers: headers, 'observe': 'response' });

  }

  resetPassword(emailPasswordObject: object) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(AppConstant.NS_ENDPOINT + 'user/reset-password', emailPasswordObject,
      { headers: headers, 'observe': 'response' });
  }

}
