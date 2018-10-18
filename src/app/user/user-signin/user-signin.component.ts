import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService, private commonService: NsCommonService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

    this.formInvalid = false;
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
        //  console.log(response);
        this.commonService.sessionToken = response.headers.get(AppConstant.X_AUTH_TOKEN);

        console.log(response.body);
        this.commonService.loginResponse = response.body.message;

        // redirect programmatcaclly to home page (notes)
        this.router.navigate(['../home'], { relativeTo: this.route });

      },
      err => {

        console.log(err);
        if (err.status === 401) {
          this.formInvalid = true;
          this.errorMessage = 'Username and/or password is incorrect. Please enter valid credentials.';
        }
        // invald credentials
      }
    );

  }

}
