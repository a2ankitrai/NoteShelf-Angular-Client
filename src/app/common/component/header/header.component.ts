import { LoggedInUser } from 'src/app/common/model/logged-in-user.model';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { LocalStorageService } from './../../service/local-storage.service';
import { UserService } from './../../../user/service/user.service';

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
    private localStorageService: LocalStorageService) {

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

    this.userService.logoutUser().subscribe(res => {
      console.log(res);
      this.commonService.userLoggedInSubject.next(false);
      this.localStorageService.removeItem(AppConstant.SESSION_TOKEN);

      this.router.navigate(['../user'], { relativeTo: this.route });
    }, err => {
      console.error(err);
      console.log('error occured in logout user');
    });

  }
}
