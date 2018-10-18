import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserLogin } from '../model/userlogin.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The back-end returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facinßg error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  accessNonSecuredEndpoint() {

    // let headers = new HttpHeaders();

    return this.http.get('http://localhost:9000/greeting2', { responseType: 'text', 'observe': 'response' })
      .pipe(catchError(this.handleError));
  }



  authenticatingRequest(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + btoa('tu1:password'));
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('observe', 'response');

    const httpOptions = {
      headers: headers
    };

    // const data = JSON.stringify({ username: 'tu1', password: 'password' });

    // console.log(data);
    return this.http.post('http://localhost:9000/user/login', null, { headers: headers, 'observe': 'response' })
      .pipe(
        tap( // Log the result or error
          data => {/*console.log(data)*/ },
          error => catchError(this.handleError)
        )
      );
  }


  accessAuthencatedEndpointWithToken(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('X-Auth-Token', token);

    return this.http.post('http://localhost:9000/user/logout', null, { headers: headers })
      .pipe(catchError(this.handleError));
  }


  getLogin() {

    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', 'true');

    //    return this.http.get('http://localhost:9000/user/login', {headers: head)

    return this.http.get('http://localhost:9000/greeting');

    //      return this.http.get('http://localhost:8080/greetings', {headers: headers});
  }

  saveData() {
    return this.http.post('http://localhost:8080/save', 'ankit');
  }

  loginSubmit(userLogin: UserLogin) {

    const data = JSON.stringify({ username: userLogin.name, password: userLogin.password });
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('username:password'));
    headers = headers.append('Content-Type', 'application/json');
    //    headers = headers.append('Cache-Control', 'no-cache');


    return this.http.post('http://localhost:9000/user/login', data, { headers: headers });

  }

}
