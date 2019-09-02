import { AboutComponent } from './../common/component/about/about.component';
import { SocialLoginComponent } from './../common/component/social-login/social-login.component';
import { NotesRoutingModule } from './../notes/notes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserRoutingModule } from 'src/app/user/user-routing.module';
import { PageNotFoundComponent } from 'src/app/common/component/page-not-found/page-not-found.component';
import { ProfileRoutingModule } from 'src/app/profile/profile-routing.module';
import { PlaygroundComponent } from '../common/component/playground/playground.component';
import { IntroComponent } from '../common/component/intro/intro.component';
import { PolicyComponent } from '../common/component/policy/policy.component';

const appRoutes: Routes = [

  // { path: 'notes', component: NotesComponent },
  { path: '', component: IntroComponent },
  // { path: '', redirectTo: '/user', pathMatch: 'full', },
  { path: 'social-login', component: SocialLoginComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: 'about', component: AboutComponent },
  {path: 'privacy-policy', component: PolicyComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ProfileRoutingModule,
    NotesRoutingModule,
    RouterModule.forRoot(appRoutes,
      // { enableTracing: true }
    ),
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
