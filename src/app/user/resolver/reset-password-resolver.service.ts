import { catchError } from 'rxjs/operators';
import { UserService } from './../service/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenVerificationResponse } from '../model/token-verification-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordResolverService implements Resolve<any> {

  constructor(private userService: UserService, private route: Router) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const token = route.paramMap.get('token');

    // this resolver is no longer required as it's functionality is handled in the component.
    // return this.userService.verifyPasswordResetToken(token);



    // .subscribe(
    //   res => {
    //     const tokenVerificationResponse = res.body as TokenVerificationResponse;
    //     return tokenVerificationResponse;
    //   }, err => {
    //     const errRes = err.error;
    //     console.log(errRes);
    //     return undefined;
    //   });

    // this.tokenResponseObservable.subscribe(res => {
    //   const tokenVerificationResponse = res.body as TokenVerificationResponse;

    //   if (tokenVerificationResponse.errorCode === 0) {
    //     this.isTokenVerified = true;
    //     this.userName = tokenVerificationResponse.tokenDto.userName;
    //     this.userEmail = tokenVerificationResponse.tokenDto.userEmail;

    //   } else {
    //     this.isTokenVerified = false;
    //     this.invalidTokenMessage = tokenVerificationResponse.errorMessage;
    //   }

    // }, err => {
    //   const errRes = err.error;
    //   this.isTokenVerified = false;
    //   this.invalidTokenMessage = 'Some Error occured while retrieving token details';
    //   console.log(errRes);
    // });
  }
}

