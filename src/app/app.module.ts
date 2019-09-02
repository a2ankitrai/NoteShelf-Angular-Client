import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { HeaderComponent } from './common/component/header/header.component';
import { FooterComponent } from './common/component/footer/footer.component';
import { PageNotFoundComponent } from './common/component/page-not-found/page-not-found.component';
import { ProfileModule } from './profile/profile.module';
import { PlaygroundComponent } from './common/component/playground/playground.component';
import { NotesModule } from './notes/notes.module';
import { CoreModule } from './core/core.module';
import { SocialLoginComponent } from './common/component/social-login/social-login.component';
import { CookieService } from 'ngx-cookie-service';
import { PolicyComponent } from './common/component/policy/policy.component';
import { AboutComponent } from './common/component/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
// For MDB Angular Free
// import { NavbarModule, WavesModule } from 'angular-bootstrap-md';
import { IntroComponent } from './common/component/intro/intro.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    PlaygroundComponent,
    SocialLoginComponent,
    PolicyComponent,
    AboutComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    FormsModule,
    NgbModule,
    // NavbarModule,
    // WavesModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    NotesModule,
    UserModule,
    ProfileModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  providers: [CookieService]
})
export class AppModule { }
