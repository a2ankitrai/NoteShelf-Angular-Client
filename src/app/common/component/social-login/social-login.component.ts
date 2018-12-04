import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NsCommonService } from '../../service/ns-common.service';
import { LoggedInUser } from '../../model/logged-in-user.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  jwtToken: string;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private commonService: NsCommonService,
    private userService: UserService) { }

  ngOnInit() {
    this.jwtToken = this.getParamValueQueryString('token');

    console.log('jwtToken: ' + this.jwtToken);

    if (this.jwtToken !== undefined) {

      this.commonService.jwtToken = this.jwtToken;
      this.userService.getLoggedInUserfromBearerToken(this.jwtToken).subscribe(response => {
        console.log(response);

        const loginResponse = response.body;

        console.log(loginResponse);
        this.commonService.setUser(loginResponse as LoggedInUser);

        console.log('common service user');
        console.log(this.commonService.getUser());
        this.commonService.userLoggedInSubject.next(true);

        this.router.navigate(['../user'], { relativeTo: this.route });
      },
        err => {
          console.error(err);
        });
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
