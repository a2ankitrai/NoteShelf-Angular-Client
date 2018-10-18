import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLogin } from '../model/userlogin.model';
import { HttpResponse } from '@angular/common/http';
import { error } from 'protractor';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  loginForm: FormGroup;
  formInvalid: boolean;
  sessionToken: string;

  constructor() { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

    this.formInvalid = false;
  }

  accessNonSecuredEndpoint() {
    this.userService.accessNonSecuredEndpoint().subscribe(
      (data: any) => {
        console.log(data);
      },
      erro => console.error(error) // error path
    );
  }

  authenticatingRequest2() {
    this.userService.authenticatingRequest().subscribe(
      (data: any) => {
        console.log(data);
      },
      erro => console.error(error)
    );
  }

  authenticatingRequest() {
    this.userService.authenticatingRequest().subscribe(
      resp => {

        // (res: HttpResponse<any>) => {
        //   console.log(res.headers);
        // }

        console.log(resp);

        const keys = resp.headers.keys();

        console.log(keys);

        const headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        console.log('----------');
        console.log('Response headers');
        console.log('----------');

        console.log(headers);

        console.log('----------');
        console.log('Token headers');
        console.log('----------');

        console.log(resp.headers.get('X-Auth-Token'));

        this.sessionToken = resp.headers.get('X-Auth-Token');

        // X-Auth-Token →d29c2e59-0b37-475f-9cc2-e6795fd68641

        console.log('----------');
        console.log('response body');
        console.log('----------');

        console.log(resp.body);
      });
  }

  logout() {
    this.userService.accessAuthencatedEndpointWithToken(this.sessionToken).subscribe(
      res => { console.log(res); },
      (err) => { console.error(err); }
    );
  }

  onLoginSubmit() {

    const userName = this.loginForm.get('userName');
    const password = this.loginForm.get('password');

    //    if (!userName.touched || userName.value === '' || !password.touched || password.value === null) {
    //
    //      this.formInvalid = true;
    //      return;
    //    } else {
    //      this.formInvalid = false;
    //    }

    //    const userLogin = new UserLogin(userName.value, password.value);
    //
    //    this.userService.loginSubmit(userLogin).subscribe(
    //      response => console.log('Successful Login \n ' + response),
    //      error => console.log('Error occured \n ' + error));


    this.userService.getLogin().subscribe(
      response => console.log('Successful Login \n ' + response),
      erro => {
        console.log('Error occured \n ');
        console.log(error);
      }
    );

    //    this.userService.saveData().subscribe(
    //      response => console.log('Successful save \n ' + response),
    //      error => {
    //        console.log('Error occured \n ');
    //        console.log(error);
    //      }
    //    );

    //    this.loginForm.reset({
    //      'userName': '',
    //      'password': ''
    //    });

  }

}
