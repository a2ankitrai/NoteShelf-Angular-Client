import { Profile } from './../model/profile.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { ActivatedRoute } from '@angular/router';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { LoggedInUser } from 'src/app/common/model/logged-in-user.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { enterAnimation } from 'src/app/common/animations/animations';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { DateValidator } from 'src/app/common/validators/date-valid.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    enterAnimation
  ],
})
export class ProfileComponent implements OnInit {

  user: LoggedInUser;
  profile: Profile;
  profileForm: FormGroup;
  // pictureForm: FormGroup;
  profileFormSubmitted = false;

  dateOfBirth: Date;
  bsDatepickerConfig: Partial<BsDatepickerConfig>;

  // responseMessage: string;
  // responseAlertClass = {
  //   'alert': true,
  //   'alert-success': false,
  //   'alert-danger': false
  // };

  public imagePath: string;
  imgURL: any;
  public message: string;
  imageFile: File;

  profileImageBlob: Blob;

  private alertSubject = new Subject<string>();
  alertMessage: string;
  alertType: string;

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private commonService: NsCommonService,
    private route: ActivatedRoute) {

    this.route.data.subscribe(response => {
      this.profile = response.profile.body as Profile;

      if (this.profile.birth_date !== null && this.profile.birth_year !== null) {
        const date = +this.profile.birth_date.split('-')[0];
        const month = +this.profile.birth_date.split('-')[1];
        this.dateOfBirth = new Date();
        this.dateOfBirth.setDate(date);
        this.dateOfBirth.setMonth(month);
        this.dateOfBirth.setFullYear(+this.profile.birth_year);
      } else {
        this.dateOfBirth = undefined;
      }

      this.profileImageBlob = response.profilePicture;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imgURL = reader.result;
      }, false);

      if (this.profileImageBlob) {
        console.log('blob exists');
        reader.readAsDataURL(this.profileImageBlob);
      } else if (this.commonService.getUser().profilePicture !== null) {
        this.imgURL = this.commonService.getUser().profilePicture;
      } else {
        this.imgURL = './assets/images/default_profile_picture.png';
      }


    });

    const minDateVal = new Date();
    minDateVal.setDate(minDateVal.getDate() - 365 * 100);
    const maxDateVal = new Date();
    maxDateVal.setDate(minDateVal.getDate() - 365 * 5);

    this.bsDatepickerConfig = {
      dateInputFormat: 'DD-MM-YYYY',
      containerClass: 'theme-blue',
      minDate: minDateVal,
      maxDate: maxDateVal
    };
    // this.imgURL = './assets/images/default_profile_picture.png';
  }

  ngOnInit() {

    // this.pictureForm = this.formBuilder.group({
    //   profile_picture: []
    // });

    // implement proper validation here as well as server side for all the fields.
    this.profileForm = this.formBuilder.group({

      // check on fetching this value even in the case of site reload...
      // user_name: [this.userName, Validators.required],
      profile_picture: [],
      first_name: [this.profile.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      last_name: [this.profile.last_name, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      gender: [this.profile.gender,
        //  [Validators.maxLength(20)]
      ],
      work: [this.profile.work, [Validators.maxLength(20)]],
      contact_number: [this.profile.contact_number, [Validators.minLength(6), Validators.maxLength(11)]],
      date_of_birth: [this.dateOfBirth, [DateValidator()]],
      // birth_date: [this.profile.birth_date],
      // birth_year: [this.profile.birth_year],
      language: [this.profile.language, [Validators.minLength(3), Validators.maxLength(20)]],
    });

    this.user = this.commonService.getUser();

    this.alertSubject.subscribe((message) => this.alertMessage = message);
    this.alertSubject.pipe(debounceTime(AppConstant.ALERT_CLOSE_TIME)).subscribe(() => this.alertMessage = null);

  }

  get prf() {
    return this.profileForm.controls;
  }

  preview(files: any) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;

      this.profileService.updateProfilePicture(files[0]).subscribe(res => {
        console.log(res);
      }, err => {
        console.error(err);
      });
    };
  }

  previewAndUploadFile(event) {
    if (event.target.files && event.target.files.length > 0) {

      const file = event.target.files[0];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      // more validations related to file size

      const reader = new FileReader();

      this.imageFile = file;
      reader.readAsDataURL(this.imageFile);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
      this.profileService.updateProfilePicture(this.imageFile).subscribe(res => {
        console.log(res);
      }, err => {
        console.error(err);
        // handle this properly giving error ui response as to why it failed.
      });
    }
  }

  onPictureFormSubmit() { }


  updateProfileInformation() {

    this.profileFormSubmitted = true;

    console.log('profile form submitted: ' + this.profileFormSubmitted);
    console.log('profile form invalid: ' + this.profileForm.invalid);

    if (this.profileForm.invalid) {
      return;
    }

    this.profile = this.profileForm.value;

    this.dateOfBirth = this.profileForm.get('date_of_birth').value;
    if (this.dateOfBirth !== null && this.dateOfBirth !== undefined) {
      this.profile.birth_date = this.dateOfBirth.getDate().toString() + '-' + this.dateOfBirth.getMonth().toString();
      this.profile.birth_year = this.dateOfBirth.getFullYear().toString();
    }

    this.profileService.saveUserProfile(this.profile).subscribe(response => {
      console.log(response);
      // this.responseMessage = 'Profile updated successfully.';
      // this.resetResponseAlert();
      // this.setResponseAlert('success');

      const message = 'Profile information updated successfully..';
      this.alertType = AppConstant.SUCCESS;
      this.alertSubject.next(message);
    },
      err => {
        console.error(err);
        const message = 'Some error occured while updating the Profile information.';
        this.alertType = AppConstant.DANGER;
        this.alertSubject.next(message);

      });

  }

  // resetResponseAlert() {
  //   this.responseAlertClass['alert-success'] = false;
  //   this.responseAlertClass['alert-danger'] = false;
  // }

  // setResponseAlert(response: string) {
  //   if (response === 'success') {
  //     this.responseAlertClass['alert-success'] = true;
  //   } else {
  //     this.responseAlertClass['alert-danger'] = true;
  //   }
  // }

}
