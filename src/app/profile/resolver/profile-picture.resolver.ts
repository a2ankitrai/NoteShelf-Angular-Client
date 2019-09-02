import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from '../service/profile.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureResolver implements Resolve<any> {

  constructor(private profileService: ProfileService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Blob> {

    const blob: Blob = undefined;

    return this.profileService.getProfilePicture()
      .pipe(catchError(err => of(
        blob
      )));
  }

}
