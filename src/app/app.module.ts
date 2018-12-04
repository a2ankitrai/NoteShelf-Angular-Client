import { NsCommonService } from 'src/app/common/service/ns-common.service';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    PlaygroundComponent,
    SocialLoginComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    NotesModule,
    UserModule,
    ProfileModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
