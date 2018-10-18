import { NotesRoutingModule } from './../notes/notes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserRoutingModule } from 'src/app/user/user-routing.module';
import { PageNotFoundComponent } from 'src/app/common/component/page-not-found/page-not-found.component';
import { ProfileRoutingModule } from 'src/app/profile/profile-routing.module';
import { PlaygroundComponent } from '../common/component/playground/playground.component';

const appRoutes: Routes = [

  // { path: 'notes', component: NotesComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full', },
  { path: 'playground', component: PlaygroundComponent},
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
