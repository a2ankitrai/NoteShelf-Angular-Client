import { ProfileService } from './../service/profile.service';
import { Profile } from './../model/profile.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<Profile> {

  constructor(private profileService: ProfileService, private route: Router) { }

  // check on how to pass route params without getting displayed in url in browser.
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.profileService.getUserProfile();
  }
}
