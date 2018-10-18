import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent, children: [
      { path: 'sign-in', component: UserSigninComponent },
      { path: 'sign-up', component: UserRegistrationComponent },
      { path: 'home', component: UserHomeComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
