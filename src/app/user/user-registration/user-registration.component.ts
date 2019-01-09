import { UserService } from '../service/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../model/userRegistration.model';
import { NsCommonService } from '../../common/service/ns-common.service';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { MustMatch } from 'src/app/common/validators/must-match.validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;
  userRegistration: UserRegistration;
  formInvalid: boolean;
  registrationSuccess: boolean;
  registrationFailure: boolean;
  registrationFailureMessage: string;
  serverValidationErrors: any = undefined;
  serverSideErrors: any = undefined;
  response = '';

  constructor(private userService: UserService, private commonService: NsCommonService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    // this.userRegistrationForm = new FormGroup({
    //   user_name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    //   first_name: new FormControl(null, [Validators.required]),
    //   last_name: new FormControl(null, [Validators.required]),
    //   email_address: new FormControl(null, [Validators.email, Validators.required]),
    //   password: new FormControl(null, [Validators.required]),
    //   confirm_password: new FormControl(null, [Validators.required])
    // });

    this.userRegistrationForm = this.formBuilder.group({
      user_name: ['', [Validators.required, Validators.minLength(3)]],
      email_address: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      auth_type: [AppConstant.AUTH_TYPE_APP]
    }, {
        validator: MustMatch('password', 'confirm_password')
      });
  }

  get f() {
    return this.userRegistrationForm.controls;
  }

  onRegistrationFormSubmit() {
    console.log('registration form being submit: start');

    // validations

    if (this.userRegistrationForm.invalid) {
      this.formInvalid = true;
      return;
    } else {
      this.formInvalid = false;
    }

    console.warn(this.userRegistrationForm.value);

    //   const userRegistration = new UserRegistration(this.userRegistrationForm.get('user_name').value,
    //   this.userRegistrationForm.get('first_name').value, this.userRegistrationForm.get('last_name').value,
    //   this.userRegistrationForm.get('email_address').value, this.userRegistrationForm.get('password').value,
    //   this.userRegistrationForm.get('confirm_password').value);

    this.userRegistration = new UserRegistration(this.userRegistrationForm.value);
    this.registrationFailure = false;
    this.serverSideErrors = undefined;
    this.serverValidationErrors = undefined;

    this.userService.requestUserRegistration(this.userRegistration).subscribe(
      response => {
        console.log(response);
        this.response = response;
        this.registrationSuccess = true;
        setTimeout(() => {
          this.registrationSuccess = false;
        }, 10000);

        this.userRegistrationForm.reset();

        // verification mail notification and associated flow

      },
      err => {
        const errors = err.error;
        console.log(err);

        // below status positioning anamoly is due to exception handler on server side
        // check if it can be generalised.
        if (errors.status === 500) {
          this.serverSideErrors = errors.exceptionMessage;
          console.error('Internal Server Error Occured');
          console.log(errors.exceptionMessage);
          this.serverSideErrors = errors.exceptionMessage;
        } else if (err.status === 400 && err.error.validationErrors) {

          console.log('Validation errors found');
          this.serverValidationErrors = new Array();
          this.serverValidationErrors = err.error.validationErrors;
        } else {
          // Error while connecting to the back-end server
          console.log('Error while connecting to the back-end server');
          this.serverSideErrors = 'Error while connecting to the back-end server';
        }


        this.registrationFailure = true;

      }
    );

    console.log('registrarion form being sumit: end');
  }

}
