import { error } from 'protractor';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';
import { TokenVerificationResponse } from '../model/token-verification-response.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationResolverService implements Resolve<any> {

  constructor(private userService: UserService, private route: Router) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TokenVerificationResponse> {

    const token = route.paramMap.get('token');
    return this.userService.verifyRegistrationEmail(token)
    .pipe(catchError(err => of(
      err.error
    )));
  }
}
