import { Profile } from './../model/profile.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import * as AppConstant from 'src/app/common/constant/app-constant';


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

  getUserProfilePictureByUserId(userId: string) {
    const headers = this.commonService.setCommonHeaders();
    return this.http.get(AppConstant.NS_ENDPOINT + 'profile/picture', { headers: headers, 'observe': 'response' });
  }

  saveUserProfile(profile: Profile) {
    const headers = this.commonService.setCommonHeaders();
    return this.http.put(AppConstant.NS_ENDPOINT + 'profile', profile, { headers: headers, 'observe': 'response' });
  }

  accessAuthencatedEndpointWithToken(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('X-Auth-Token', token);

    return this.http.post('http://localhost:9000/user/logout', null, { headers: headers });
  }
}
