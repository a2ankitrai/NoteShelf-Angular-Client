import { LoggedInUser } from 'src/app/common/model/logged-in-user.model';
import { NsCommonService } from './../../common/service/ns-common.service';
import { LocalStorageService } from './../../common/service/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { UserService } from '../service/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private commonService: NsCommonService,
    private userService: UserService,
    private cookieService: CookieService) { }

  ngOnInit() {

    const sessionToken = this.localStorageService.getItem(AppConstant.SESSION_TOKEN);
    const jwtToken = this.cookieService.get(AppConstant.JWT_SOCIAL_LOGIN_TOKEN);

    console.log('inside user component: ');
    console.log('commenservice sessionToken => ' + this.commonService.sessionToken);
    console.log('commenservice jwtToken => ' + this.commonService.jwtToken);

    if ((sessionToken && this.isValid(sessionToken))) {
      this.commonService.sessionToken = sessionToken;
      console.log('user:');
      console.log(this.commonService.getUser());

      if (this.commonService.getUser() !== undefined) {
        this.routeToHomePage();
      } else {
        this.userService.getLoggedInUserFromSessionToken().subscribe(
          res => {
            console.log(res);
            this.commonService.setUser(res.body as LoggedInUser);
            this.routeToHomePage();
          },
          err => {
            console.error('error occured while retrieving user from stored session.');
            this.localStorageService.removeItem(AppConstant.SESSION_TOKEN);
            this.routeToSignInPage();
          }
        );
      }
    } else if (jwtToken) {
      if (this.commonService.getUser() !== undefined) {
        this.router.navigate(['home'], { relativeTo: this.route });
      } else {
        this.userService.getLoggedInUserfromBearerToken(jwtToken).subscribe(
          response => {
            console.log(response);
            const loginResponse = response.body;

            this.commonService.setUser(loginResponse as LoggedInUser);
            this.cookieService.set(AppConstant.JWT_SOCIAL_LOGIN_TOKEN, jwtToken);

            console.log('common service user');
            console.log(this.commonService.getUser());
            this.commonService.userLoggedInSubject.next(true);
            this.routeToHomePage();
          },
          err => {
            console.error('error occured while retrieving user from jwt social sign in token');
            this.cookieService.delete(AppConstant.JWT_SOCIAL_LOGIN_TOKEN);
            console.error(err);
            this.routeToSignInPage();
          });
      }
    } else {
      if (!this.redirectionSkipPages()) {
        this.routeToSignInPage();
      }
      // if (!this.router.url.includes('reset-password')) {
      //   this.routeToSignInPage();
      // }
    }

  }

  routeToSignInPage() {
    this.router.navigate(['sign-in'], { relativeTo: this.route });
  }

  routeToHomePage() {
    this.router.navigate(['home'], { relativeTo: this.route });
  }

  redirectionSkipPages() {
    const components = ['reset-password', 'verify-email'];

    for (let i = 0; i < components.length; i++) {
      if (this.router.url.includes(components[i])) {
        return true;
      }
    }
  }


  isValid(sessionToken: string) {
    // add validation logic here (UUID)
    return true;
  }

}
