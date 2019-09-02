import { Profile } from './../model/profile.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private commonService: NsCommonService) {

  }

  getUserProfile() {
    const headers = this.commonService.setCommonHeaders();
    // return this.http.get<Profile>(AppConstant.NS_ENDPOINT + 'profile', { headers: headers });
    return this.http.get(AppConstant.NS_ENDPOINT + 'profile', { headers: headers, 'observe': 'response' });
  }

  getProfilePicture(): Observable<Blob> {
    const headers = this.commonService.setCommonHeaders();
    return this.http.get(AppConstant.NS_ENDPOINT + 'profile/picture', { headers: headers, responseType: 'blob' });
  }

  saveUserProfile(profile: Profile) {
    const headers = this.commonService.setCommonHeaders();
    return this.http.put(AppConstant.NS_ENDPOINT + 'profile', profile, { headers: headers, 'observe': 'response' });
  }

  updateProfilePicture(imageFile: any) {

    let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json');
    // headers = headers.set('Content-Type', 'multipart/form-data');
    headers = headers.set(AppConstant.X_AUTH_TOKEN, this.commonService.getSessionToken());
    const formdata: FormData = new FormData();
    formdata.append('picture', imageFile);
    return this.http.put(AppConstant.NS_ENDPOINT + 'profile/picture', formdata,
      { headers: headers, 'observe': 'response' });
  }
}
