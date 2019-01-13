import { NotesService } from './../../../notes/service/notes.service';
import { LoggedInUser } from 'src/app/common/model/logged-in-user.model';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { LocalStorageService } from './../../service/local-storage.service';
import { UserService } from './../../../user/service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  // templateUrl: './header.component.2.html',
  // styleUrls: ['./header.component.2.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  headerRightSideTemplate: TemplateRef<any>;
  userLoggedIn: boolean;
  loggedInUser: LoggedInUser;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private commonService: NsCommonService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService,
    private notesService: NotesService) {

    commonService.userLoggedInObservable.subscribe((val: boolean) => {
      this.userLoggedIn = val;
      this.userLoggedIn === true ? this.loggedInUser = this.commonService.getUser() : this.loggedInUser = undefined;
    });
  }

  // postLoginCtx = { userName: this.commonService.getUser().userName };

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  redirectHomeSignIn() {
    if (this.userLoggedIn) {
      this.commonService.routeToHomePage(this.router);
    } else {
      this.commonService.routeToSignInPage(this.router);
    }
  }

  logoutUser() {
    if (this.loggedInUser.authType === AppConstant.AUTH_TYPE_APP) {
      this.userService.logoutUser().subscribe(res => {
        console.log(res);
        this.clearLoggedInUserDetails();
        this.commonService.routeToSignInPage(this.router);
      }, err => {
        console.error(err);
        console.log('error occured in logout user');
        this.clearLoggedInUserDetails();
        this.commonService.routeToSignInPage(this.router);
      });
    } else {
      this.clearLoggedInUserDetails();
      this.commonService.routeToSignInPage(this.router);
    }
  }

  clearLoggedInUserDetails() {

    if (this.loggedInUser.authType === AppConstant.AUTH_TYPE_APP) {
      this.userService.logoutUser();
      this.commonService.setSessionToken(null);
      this.localStorageService.removeItem(AppConstant.SESSION_TOKEN);
    } else {
      this.commonService.setJwtToken(null);
      this.cookieService.delete(AppConstant.JWT_SOCIAL_LOGIN_TOKEN);
    }

    this.notesService.clearNotesService();

    this.commonService.setUser(undefined);
    this.commonService.userLoggedInSubject.next(false);
    this.commonService.loginResponse = undefined;
  }
}
