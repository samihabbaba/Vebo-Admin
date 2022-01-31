import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { url } from 'inspector';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

const roles = {
  shop: [
    '/home',
    '/self-transaction',
    '/users/customer',
    '/risk-management/risk-plans',
    '/bets/view-bets',
  ],
  promoter: [
    '/home',
    '/self-transaction',
    '/users/shop',
    '/users/customer',
    '/risk-management/risk-plans',
    '/bets/view-bets',
  ],
  office: ['/bets/bet-office'],
};

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.validToken()) {
      this.authService.logout();
      return false;
    }

    const token = localStorage.getItem('token');

    if (token) {
      const user = this.authService.decodedToken;
      // logged in so return true
      console.log(state);
      console.log(user);
      if (user.role === 'Master') {
        return true;
      }
      if (user.role === 'Shop' && roles.shop.includes(state.url)) {
        return true;
      }

      if (user.role === 'Promoter' && roles.promoter.includes(state.url)) {
        return true;
      }

      if (user.role === 'Office' && roles.office.includes(state.url)) {
        return true;
      }
    }

    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
