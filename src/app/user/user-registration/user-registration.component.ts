import { UserService } from '../service/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../model/userRegistration.model';
import { NsCommonService } from '../../common/service/ns-common.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;
  formInvalid: boolean;
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
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  get user_name() { return this.userRegistrationForm.get('user_name'); }
  get first_name() { return this.userRegistrationForm.get('first_name'); }
  get last_name() { return this.userRegistrationForm.get('last_name'); }
  get email_address() { return this.userRegistrationForm.get('email_address'); }
  get password() { return this.userRegistrationForm.get('password'); }
  get confirm_password() { return this.userRegistrationForm.get('confirm_password'); }


  onRegistrationFormSubmit() {
    console.log('registrarion form being submit: start');

    // validations

    if (this.userRegistrationForm.invalid) {
      this.formInvalid = true;
      return;
    } else {
      this.formInvalid = false;
    }

    console.warn(this.userRegistrationForm.value);

    const userRegistration = new UserRegistration(this.userRegistrationForm.get('user_name').value,
      this.userRegistrationForm.get('first_name').value, this.userRegistrationForm.get('last_name').value,
      this.userRegistrationForm.get('email_address').value, this.userRegistrationForm.get('password').value,
      this.userRegistrationForm.get('confirm_password').value);

    this.userService.requestUserRegistration(userRegistration).subscribe(
      response => {
        console.log(response);
        this.response = response;
      },
      err => {
        console.error(err);
      }
    );

    console.log('registrarion form being sumit: end');
  }

}
