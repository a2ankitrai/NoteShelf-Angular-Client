import { enterAnimation } from './../../common/animations/animations';
import { UserDto } from './../model/user-dto.model';
import { TokenVerificationResponse } from './../model/token-verification-response.model';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MustMatch } from 'src/app/common/validators/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations: [
    enterAnimation
  ],
})
export class ResetPasswordComponent implements OnInit {


  isTokenVerified = false;
  token: string;
  tokenVerificationResponse: TokenVerificationResponse;
  tokenResponseObservable: Observable<HttpResponse<Object>>;

  resetPasswordForm: FormGroup;
  resetPasswordFormSubmitted = false;

  userName: string;
  userEmail: string;

  formInvalid: boolean;
  invalidTokenMessage: string;

  private alertSubject = new Subject<string>();
  alertMessage: string;
  alertType: string;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    const token = this.route.snapshot.paramMap.get('token');

    this.userService.verifyPasswordResetToken(token).subscribe(res => {
      const tokenVerificationResponse = res.body as TokenVerificationResponse;

      console.log(tokenVerificationResponse);
      if (tokenVerificationResponse.errorCode === 0) {
        this.isTokenVerified = true;
        this.userName = tokenVerificationResponse.tokenDto.userName;
        this.userEmail = tokenVerificationResponse.tokenDto.userEmail;

      } else {
        this.isTokenVerified = false;
        this.invalidTokenMessage = tokenVerificationResponse.errorMessage;

        this.alertType = 'danger';
        this.alertSubject.next(this.invalidTokenMessage);
      }
    }, err => {
      console.log(err);
      const errRes = err.error;
      this.isTokenVerified = false;

      const errorCode = errRes.errorCode;
      const errorMessage = errRes.errorMessage;
      const status = errRes.status;
      const httpStatus = err.status;

      if (errorCode === 1 || errorCode === 2 || errorCode === 3) {
        this.invalidTokenMessage = errorMessage;
      } else {
        this.invalidTokenMessage = 'Some Error occured while retrieving token details';
      }

      this.alertType = 'danger';
      this.alertSubject.next(this.invalidTokenMessage);

      console.log(errRes);
    });



    // https://stackoverflow.com/questions/49433897/getting-the-data-from-the-resolver-in-angular
    // this.tokenVerificationResponse = this.route.snapshot.data.tokenResponse.body;

    // if (this.tokenVerificationResponse.errorCode === 0) {
    //   this.isTokenVerified = true;
    //   this.userName = this.tokenVerificationResponse.tokenDto.userName;
    //   this.userEmail = this.tokenVerificationResponse.tokenDto.userEmail;
    // }

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

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });


    this.alertSubject.subscribe((message) => this.alertMessage = message);
    this.alertSubject.pipe(debounceTime(7000)).subscribe(() => this.alertMessage = null);

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  onResetPasswordFormSubmit() {

    this.resetPasswordFormSubmitted = true;

    console.log('reset password form submitted: ' + this.resetPasswordFormSubmitted);


    if (this.resetPasswordForm.invalid) {
      this.formInvalid = true;
      return;
    } else {
      this.formInvalid = false;
    }
    const emailPasswordObject = { email: this.userEmail, password: this.resetPasswordForm.value['password'] };
    this.userService.resetPassword(emailPasswordObject).subscribe(
      res => {

        const userDto = res.body as UserDto;
        if (userDto != null) {
          const message = 'Your Password reset request is successful. Redirecting to Sign In...';
          this.alertType = 'success';
          this.alertSubject.next(message);

          setTimeout(() => {
            this.router.navigate(['/user/sign-in']);
          }, 5000);

        } else {
          const message = 'Some error occurred while resetting the password. Please try again after sometime.';
          this.alertType = 'danger';
          this.alertSubject.next(message);
        }
      }, err => {

        console.log(err.error);

        const message = 'Some error occurred while resetting the password. Please try again after sometime.';
        this.alertType = 'danger';
        this.alertSubject.next(message);
      });

  }

}
