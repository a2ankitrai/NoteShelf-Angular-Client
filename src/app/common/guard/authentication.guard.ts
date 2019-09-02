import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private commonService: NsCommonService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.commonService.getUser() === null || this.commonService.getUser() === undefined) {
      this.router.navigate(['/user/sign-in'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    } else {
      return true;
    }

  }
}
