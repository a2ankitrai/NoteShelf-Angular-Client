import { Subject } from 'rxjs';
import { UserService } from './../service/user.service';
import { TokenDto } from './../model/token-dto.model';
import { TokenVerificationResponse } from './../model/token-verification-response.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as AppConstant from 'src/app/common/constant/app-constant';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  tokenVerificationResponse: TokenVerificationResponse;
  tokenDto: TokenDto;
  emailVerificationCompleted = false;
  accountActivationSuccess = false;
  tokenVerificationSuccess = false;

  private alertSubject = new Subject<string>();
  alertMessage: string;
  alertType: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {

    this.tokenVerificationResponse = this.route.snapshot.data.tokenVerificationResponse;
    if (this.tokenVerificationResponse.errorCode === 0) {
      this.tokenDto = this.tokenVerificationResponse.tokenDto;
      this.tokenVerificationSuccess = true;
    }
    // else {
    //   this.tokenDto = null;
    //   this.alertType = AppConstant.DANGER;
    //   this.alertSubject.next(this.tokenVerificationResponse.errorMessage);
    // }
  }

  ngOnInit() {
    console.log('inside ngOnInit start');
    if (this.tokenVerificationSuccess) {
      this.userService.activateUserAccount(this.tokenVerificationResponse.tokenDto).subscribe(res => {
        this.markEmailVerificationCompleted();
        const responseMessage = res.body;
        console.log(responseMessage);
        this.accountActivationSuccess = true;
        // this.alertType = AppConstant.SUCCESS;
        // this.alertSubject.next('Account activated Successfully');

        this.activateAlertPopup(AppConstant.SUCCESS, 'Account activated Successfully');
      }, err => {
        console.log(err.error);
        this.markEmailVerificationCompleted();
        // this.alertType = AppConstant.DANGER;
        // this.alertSubject.next('Account activation failed');
        this.activateAlertPopup(AppConstant.DANGER, 'Account activation failed');
      });
    } else {
      // this.alertType = AppConstant.DANGER;
      // this.alertMessage = this.tokenVerificationResponse.errorMessage;
      // this.alertSubject.next(this.alertMessage);
      this.activateAlertPopup(AppConstant.DANGER, this.tokenVerificationResponse.errorMessage);
      this.markEmailVerificationCompleted();
    }
  }

  markEmailVerificationCompleted() {
    setTimeout(() => {
      this.emailVerificationCompleted = true;
    }, 2000);
  }

  activateAlertPopup(alertType: string, alertMessage: string) {
    this.alertType = alertType;
    this.alertMessage = alertMessage;
    this.alertSubject.next(this.alertMessage);
  }

}
