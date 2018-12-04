import { LocalStorageService } from './../../common/service/local-storage.service';
import { LoggedInUser } from './../../common/model/logged-in-user.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserLogin } from '../model/userlogin.model';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as AppConstant from 'src/app/common/constant/app-constant';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {

  loginForm: FormGroup;
  formInvalid: boolean;
  errorMessage = '';

  constructor(private userService: UserService,
    private commonService: NsCommonService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required]),
      // hardcoded password. added for faster develop. remove this later.
      'password': new FormControl('password', [Validators.required])
    });

    this.formInvalid = false;
  }

  githubSignIn() {
    this.userService.socialSignIn('github');
  }

  googleSignIn() {
    this.userService.socialSignIn('google');
  }

  onLoginSubmit() {
    this.formInvalid = !this.formInvalid;

    const userName = this.loginForm.get('userName');
    const password = this.loginForm.get('password');

    if (!userName.touched || userName.value === '' || !password.touched || password.value === null) {
      this.formInvalid = true;
      this.errorMessage = 'Please enter Credentials!';
      return;
    } else {
      this.formInvalid = false;
      this.errorMessage = '';
    }

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
        this.commonService.userLoggedInSubject.next(true);

        this.router.navigate(['../home'], { relativeTo: this.route });

      },
      err => {

        console.log(err);
        if (err.status === 401) {
          this.formInvalid = true;
          this.errorMessage = 'Username and/or password is incorrect. Please enter valid credentials.';
        } else {
          this.errorMessage = 'Unknown Error while connecting to the server. Backend might be down.';
        }

        // invald credentials
      }
    );

  }

}
