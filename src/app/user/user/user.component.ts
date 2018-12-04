import { LoggedInUser } from 'src/app/common/model/logged-in-user.model';
import { NsCommonService } from './../../common/service/ns-common.service';
import { LocalStorageService } from './../../common/service/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { UserService } from '../service/user.service';

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
    private userService: UserService) { }

  ngOnInit() {

    const sessionToken = this.localStorageService.getItem(AppConstant.SESSION_TOKEN);
    const jwtToken = this.commonService.jwtToken;

    console.log('inside user component: ');
    console.log('commenservice sessionToken => ' + this.commonService.sessionToken);
    console.log('commenservice jwtToken => ' + this.commonService.jwtToken);

    if ((sessionToken && this.isValid(sessionToken)) || jwtToken) {

      this.commonService.sessionToken = sessionToken;

      console.log('user:');
      console.log(this.commonService.getUser());

      if (this.commonService.getUser() !== undefined) {
        this.router.navigate(['home'], { relativeTo: this.route });
      } else {
        this.userService.getLoggedInUserFromSessionToken().subscribe(
          res => {
            console.log(res);
            this.commonService.setUser(res.body as LoggedInUser);
            this.router.navigate(['home'], { relativeTo: this.route });
          },
          err => {
            console.error('error occured while retrieving user from stored session.');
            this.localStorageService.removeItem(AppConstant.SESSION_TOKEN);
            this.router.navigate(['sign-in'], { relativeTo: this.route });
          }
        );
      }
    } else {
      this.router.navigate(['sign-in'], { relativeTo: this.route });
    }

  }

  isValid(sessionToken: string) {
    // add validation logic here (UUID)
    return true;
  }

}
