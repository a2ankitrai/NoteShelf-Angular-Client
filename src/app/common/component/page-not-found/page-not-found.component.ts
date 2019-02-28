import { Component, OnInit } from '@angular/core';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { NsCommonService } from '../../service/ns-common.service';
import { Router } from '@angular/router';
import { LoggedInUser } from '../../model/logged-in-user.model';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  appName: string;
  userLoggedIn: boolean;
  loggedInUser: LoggedInUser;

  constructor(private commonService: NsCommonService, private router: Router) {
    this.appName = AppConstant.APP_NAME;

    commonService.userLoggedInObservable.subscribe((val: boolean) => {
      this.userLoggedIn = val;
      this.userLoggedIn === true ? this.loggedInUser = this.commonService.getUser() : this.loggedInUser = undefined;
    });
  }

  ngOnInit() {
  }

  redirectHomeSignIn() {
    if (this.userLoggedIn) {
      this.commonService.routeToHomePage(this.router);
    } else {
      this.commonService.routeToIntroPage(this.router);
    }
  }

}
