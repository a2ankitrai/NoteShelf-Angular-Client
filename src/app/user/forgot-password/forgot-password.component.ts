import { error } from 'protractor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { UserService } from '../service/user.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NsGenericResponse } from 'src/app/common/model/ns-generic-response';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  formInvalid: boolean;
  private _message = new Subject<string>();

  alertType: string;
  alertMessage: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private commonService: NsCommonService) { }

  ngOnInit() {

    this.forgotPasswordForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.alertType = 'success';

    this._message.subscribe((message) => this.alertMessage = message);
    this._message.pipe(debounceTime(7000)).subscribe(() => this.alertMessage = null);

  }

  onForgotPasswordFormSubmit() {
    console.log('submitting forgot password form ');
    if (this.forgotPasswordForm.invalid) {
      this.formInvalid = true;
      return;
    } else {
      this.formInvalid = false;
    }

    const userEmail = this.forgotPasswordForm.value['userEmail'];

    this.userService.forgotPassword(userEmail).subscribe(
      res => {
        const response = res.body as NsGenericResponse;

        console.log(response);
        if (response.errorCode === 0) {
          this.alertType = 'success';
          this._message.next(response.message);
        } else if (response.errorCode === 1 || response.errorCode === 2) {
          this.alertType = 'danger';
          this._message.next(response.errorMessage);
        }

        this.forgotPasswordForm.reset();
      },
      err => {
        console.log(err);

        const response = err.error as NsGenericResponse;

        this.alertType = 'danger';
        this._message.next(response.errorMessage);

      }
    );

  }
}
