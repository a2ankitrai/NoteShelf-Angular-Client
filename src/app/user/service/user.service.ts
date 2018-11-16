import * as AppConstant from 'src/app/common/constant/app-constant';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/userlogin.model';
import { UserRegistration } from '../model/userRegistration.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  requestLogin(userLogin: UserLogin): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + btoa(userLogin.name + ':' + userLogin.password));
    headers = headers.set('Content-Type', 'application/json');

    // return this.http.post('http://localhost:9000/user/login', null, { headers: headers, 'observe': 'response' });

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

}
