import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordResolverService } from './resolver/reset-password-resolver.service';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { EmailVerificationResolverService } from './resolver/email-verification-resolver.service';

const routes: Routes = [
  {
    path: 'user', component: UserComponent, children: [
      {
        path: 'reset-password/:token', component: ResetPasswordComponent, resolve: {
          tokenResponse: ResetPasswordResolverService
        }
      },
      {
        path: 'verify-email/:token', component: EmailVerificationComponent, resolve: {
          tokenVerificationResponse: EmailVerificationResolverService
        }
      },
      { path: 'sign-in', component: UserSigninComponent, data: { animation: 'LoginPage' } },
      { path: 'sign-up', component: UserRegistrationComponent },
      { path: 'home', component: UserHomeComponent, data: { animation: 'HomePage' } },
      { path: 'forgot-password', component: ForgotPasswordComponent }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
