import { enterAnimation } from './../../common/animations/animations';
import { LocalStorageService } from './../../common/service/local-storage.service';
import { LoggedInUser } from './../../common/model/logged-in-user.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserLogin } from '../model/userlogin.model';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css'],
  animations: [
    enterAnimation
  ]
})
export class UserSigninComponent implements OnInit {

  loginForm: FormGroup;
  formInvalid: boolean;
  // errorMessage = '';

  loginFormSubmitted = false;

  private alertSubject = new Subject<string>();
  alertMessage: string;
  alertType: string;

  constructor(private userService: UserService,
    private commonService: NsCommonService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

    this.formInvalid = false;
    this.alertSubject.subscribe((message) => this.alertMessage = message);
  }

  githubSignIn() {
    this.userService.socialSignIn('github');
  }

  googleSignIn() {
    this.userService.socialSignIn('google');
  }

  get lf() {
    return this.loginForm.controls;
  }


  onLoginSubmit() {

    this.loginFormSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.formInvalid = !this.formInvalid;

    const userName = this.loginForm.get('userName');
    const password = this.loginForm.get('password');

    // if (!userName.touched || userName.value === '' || !password.touched || password.value === null) {
    //   this.formInvalid = true;
    //   this.errorMessage = 'Please enter Credentials!';
    //   return;
    // } else {
    //   this.formInvalid = false;
    //   this.errorMessage = '';
    // }

    const userLogin = new UserLogin(userName.value, password.value);

    this.userService.requestLogin(userLogin).subscribe(
      (response: any) => {

        this.commonService.sessionToken = response.headers.get(AppConstant.X_AUTH_TOKEN);

        const loginResponse = response.body;
        console.log(response.body);

        this.localStorageService.setItem(AppConstant.SESSION_TOKEN, this.commonService.sessionToken);

        // convert below into a function in logged in user setting partial information
        // use type casting in typescript `as`
        this.commonService.setUser(loginResponse as LoggedInUser);
        console.log('logged in user details');

        console.log(this.commonService.getUser());
        this.commonService.userLoggedInSubject.next(true);

        this.router.navigate(['../home'], { relativeTo: this.route });

      },
      err => {
        console.log(err);
        let errorMessage: string;
        if (err.status === 403) {
          errorMessage = 'Username and/or password is incorrect. Please enter valid credentials.' +
            ' If you have recently registered please verify your email address';
        } else {
          errorMessage = 'Unknown Error while connecting to the server. Please retry after sometime.';
        }
        this.alertType = AppConstant.DANGER;
        this.alertSubject.next(errorMessage);
      }
    );

  }

}
