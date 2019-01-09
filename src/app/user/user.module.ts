import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserHomeComponent } from './user-home/user-home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
    NgbAlertModule
  ],
  declarations: [
    UserComponent,
    UserSigninComponent,
    UserRegistrationComponent,
    UserHomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class UserModule { }
