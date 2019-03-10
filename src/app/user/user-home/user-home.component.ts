import * as AppConstant from 'src/app/common/constant/app-constant';
import { enterAnimation } from './../../common/animations/animations';
import { LoggedInUser } from './../../common/model/logged-in-user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  animations: [
    enterAnimation
  ]
})
export class UserHomeComponent implements OnInit {

  user: LoggedInUser;
  userName: string;

  constructor(private route: ActivatedRoute, private commonService: NsCommonService, private userService: UserService) {
  }

  ngOnInit() {

    this.user = this.commonService.getUser();
    if (this.user.authType === AppConstant.AUTH_TYPE_APP) {
      this.userName = this.user.userName;
    } else {
      if (this.user.name !== null) {
        this.userName = this.user.name;
      } else {
        this.userName = this.user.firstName + ' ' + this.user.lastName;
      }


    }
  }

  getParamValueQueryString(paramName) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }
}
