import { Profile } from './../model/profile.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { ActivatedRoute } from '@angular/router';
import { NsCommonService } from 'src/app/common/service/ns-common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  profileForm: FormGroup;
  pictureForm: FormGroup;
  profilePictureSource: string;
  editMode: Boolean;
  responseMessage: string;
  responseAlertClass = {
    'alert': true,
    'alert-success': false,
    'alert-danger': false
  };

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private commonService: NsCommonService,
    private route: ActivatedRoute) {
    this.route.data.subscribe(response => {
      this.profile = response.profile.body as Profile;
    });

  }

  ngOnInit() {

    this.pictureForm = this.formBuilder.group({
      profile_picture: []
    });

    // implement proper validation here as well as server side for all the fields.
    this.profileForm = this.formBuilder.group({
      user_name: [this.commonService.user.userName, Validators.required],
      first_name: [this.profile.first_name],
      last_name: [this.profile.last_name],
      gender: [this.profile.gender],
      work: [this.profile.work],
      contact_number: [this.profile.contact_number],
      birth_date: [this.profile.birth_date],
      birth_year: [this.profile.birth_year],
      language: [this.profile.language],
    });
  }

  get user_name() { return this.profileForm.get('user_name').value; }
  get first_name() { return this.profileForm.get('first_name').value; }
  get last_name() { return this.profileForm.get('last_name').value; }
  get gender() { return this.profileForm.get('gender').value; }
  get work() { return this.profileForm.get('work').value; }
  get contact_number() { return this.profileForm.get('contact_number').value; }
  get birth_date() { return this.profileForm.get('birth_date').value; }
  get birth_year() { return this.profileForm.get('birth_year').value; }
  get language() { return this.profileForm.get('language').value; }



  onProfileFormSubmit() {
    this.profile = this.profileForm.value;

    console.log('profile before submission: ');
    console.log(this.profile);

    this.profileService.saveUserProfile(this.profile).subscribe(response => {
      console.log(response);
      this.responseMessage = 'Profile updated successfully.';
      // this.profileForm.reset();

      this.resetResponseAlert();
      this.setResponseAlert('success');
    },
      err => {
        // handle validation error and other error properly here.
        // apply this generically
        console.error(err);
        this.responseMessage = 'Some Error occured in saving profile.';
        this.resetResponseAlert();
        this.setResponseAlert('failure');

      });

  }

  resetResponseAlert() {
    this.responseAlertClass['alert-success'] = false;
    this.responseAlertClass['alert-danger'] = false;
  }

  setResponseAlert(response: string) {
    if (response === 'success') {
      this.responseAlertClass['alert-success'] = true;
    } else {
      this.responseAlertClass['alert-danger'] = true;
    }
  }

}
