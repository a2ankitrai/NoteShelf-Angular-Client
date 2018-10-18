
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileInput } from '../model/profileInput.model';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) { }

  ngOnInit() {

    this.pictureForm = this.formBuilder.group({
      profile_picture: []
    });

    this.profileForm = this.formBuilder.group({
      user_name: ['jack23', Validators.required],
      first_name: ['Jackson'],
      last_name: ['Robin'],
      gender: ['Male'],
      work: ['Goldman Sachs'],
      contact_number: ['934723493429'],
      birth_date: ['18-Sep'],
      birth_year: ['1985'],
      language: ['Spanish'],
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

    const profileInput = new ProfileInput();

    profileInput.first_name = this.first_name;
    profileInput.last_name = this.last_name;
    profileInput.gender = this.gender;
    profileInput.work = this.work;
    profileInput.contact_number = this.contact_number;
    profileInput.birth_date = this.birth_date;
    profileInput.birth_year = this.birth_year;
    profileInput.language = this.language;

    this.profileService.saveProfile(profileInput).subscribe(
      response => {
        console.log(response);
        this.responseMessage = 'Profile updated successfully.';
        this.profileForm.reset();

        this.resetResponseAlert();
        this.setResponseAlert('success');
      },
      err => {
        console.error(err);
        this.responseMessage = 'Some Error occured in saving profile.';
        this.resetResponseAlert();
        this.setResponseAlert('failure');

      }
    );


    // submit the profile to the ns backend service.
    // clear the form

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
