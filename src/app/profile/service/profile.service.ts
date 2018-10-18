import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProfileInput } from '../model/profileInput.model';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import * as AppConstant from 'src/app/common/constant/app-constant';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private commonService: NsCommonService) { }

  saveProfile(profileInput: ProfileInput) {

    console.log('saving profile information');
    console.log(profileInput);

    /***
     * Build this common functionality
     */
    // let headers = new HttpHeaders();
    // headers = headers.set('X-Auth-Token', this.commonService.user.sessionToken);

    // return this.http.put(AppConstant.NS_ENDPOINT + '/profile', profileInput, { headers: headers });


    // replace the below with actual call to ns -app
    return Observable.create(function (observer) {
       observer.next('Information saved successfully');
      // observer.error('throwing errrs');
      observer.complete();
    });

    // mocking the service to develop fast. Learn how to create observables.
  }

  accessAuthencatedEndpointWithToken(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('X-Auth-Token', token);

    return this.http.post('http://localhost:9000/user/logout', null, { headers: headers })
      ;
  }
}
