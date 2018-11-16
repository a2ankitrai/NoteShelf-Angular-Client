import { LoggedInUser } from './../../common/model/logged-in-user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NsCommonService } from 'src/app/common/service/ns-common.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  // username: string;
  // responseMessage: any;
  user: LoggedInUser;

  constructor(private route: ActivatedRoute, private commonService: NsCommonService) { }

  ngOnInit() {

    // this.username = 'Ankit';
    // this.responseMessage = this.commonService.loginResponse;
    this.user = this.commonService.user;

    /**
     * The above information is fetched from a common service.
     * Check on how the same can be retrieved from route params, querymap
     */

  }

}
