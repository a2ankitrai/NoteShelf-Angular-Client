import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserHomeComponent } from './user-home/user-home.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserSigninComponent,
    UserRegistrationComponent,
    UserHomeComponent
  ]
})
export class UserModule { }
