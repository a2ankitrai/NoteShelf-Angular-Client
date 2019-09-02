import { enterAnimation } from './../../common/animations/animations';
import { UserService } from '../service/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../model/userRegistration.model';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { MustMatch } from 'src/app/common/validators/must-match.validator';
import { AlphaNumericValidator } from 'src/app/common/validators/alpha-numeric.validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  animations: [
    enterAnimation
  ]
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

  userRegistrationFormSubmitted = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

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
      user_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]], // AlphaNumericValidator
      email_address: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      confirm_password: ['', [Validators.required]],
      auth_type: [AppConstant.AUTH_TYPE_APP]
    },
      {
        validator: MustMatch('password', 'confirm_password')
      });
  }

  get urf() {
    return this.userRegistrationForm.controls;
  }

  onRegistrationFormSubmit() {
    this.userRegistrationFormSubmitted = true;

    if (this.userRegistrationForm.invalid) {
      this.formInvalid = true;
      return;
    } else {
      this.formInvalid = false;
    }

    console.warn(this.userRegistrationForm.value);

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
        this.userRegistrationFormSubmitted = false;
        this.formInvalid = false;
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
          console.log('Validation errors found');``
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
  }

}
