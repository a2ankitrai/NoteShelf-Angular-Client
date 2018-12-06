import { LoggedInUser } from 'src/app/common/model/logged-in-user.model';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { LocalStorageService } from './../../service/local-storage.service';
import { UserService } from './../../../user/service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerRightSideTemplate: TemplateRef<any>;
  userLoggedIn: boolean;
  loggedInUser: LoggedInUser;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private commonService: NsCommonService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService) {

    commonService.userLoggedInObservable.subscribe((val: boolean) => {
      this.userLoggedIn = val;
      this.userLoggedIn === true ? this.loggedInUser = this.commonService.getUser() : this.loggedInUser = undefined;
    });
  }

  // postLoginCtx = { userName: this.commonService.getUser().userName };

  ngOnInit() {
  }

  logoutUser() {

    console.log('logging out user...');

    if (this.loggedInUser.authType === AppConstant.AUTH_TYPE_APP) {
      this.userService.logoutUser().subscribe(res => {
        console.log(res);
        this.clearLoggedInUserDetails();
        this.router.navigate(['../user'], { relativeTo: this.route });
      }, err => {
        console.error(err);
        console.log('error occured in logout user');
      });
    } else {
      this.clearLoggedInUserDetails();
      this.router.navigate(['../user'], { relativeTo: this.route });
    }

    // if (this.commonService.getSessionToken() !== undefined && this.commonService.getSessionToken() !== null) {
    //   this.userService.logoutUser().subscribe(res => {
    //     console.log(res);
    //     this.clearLoggedInUserDetails();
    //     this.router.navigate(['../user'], { relativeTo: this.route });
    //   }, err => {
    //     console.error(err);
    //     console.log('error occured in logout user');
    //   });
    // } else if (this.commonService.jwtToken !== undefined && this.commonService.jwtToken !== null) {
    //   this.clearLoggedInUserDetails();
    //   this.router.navigate(['../user'], { relativeTo: this.route });
    // }
  }

  clearLoggedInUserDetails() {

    if (this.loggedInUser.authType === AppConstant.AUTH_TYPE_APP) {
      this.commonService.sessionToken = undefined;
      this.localStorageService.removeItem(AppConstant.SESSION_TOKEN);
    } else {
      this.commonService.setJwtToken(undefined);
      this.cookieService.delete(AppConstant.JWT_SOCIAL_LOGIN_TOKEN);
    }
    this.commonService.setUser(undefined);
    this.commonService.userLoggedInSubject.next(false);
    this.commonService.loginResponse = undefined;
  }
}
