import { enterAnimation } from './../../common/animations/animations';
import { LoggedInUser } from './../../common/model/logged-in-user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  animations: [
    enterAnimation
  ]
})
export class UserHomeComponent implements OnInit {

  // username: string;
  // responseMessage: any;
  user: LoggedInUser;
  // jwtToken: string;

  constructor(private route: ActivatedRoute, private commonService: NsCommonService, private userService: UserService) { }

  ngOnInit() {
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
