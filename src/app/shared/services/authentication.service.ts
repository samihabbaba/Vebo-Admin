import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SignalRService } from './signal-r.service';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const USER_AUTH_API_URL = '/api-url';


@Injectable()
export class AuthenticationService {
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  realLogin(email: string, password: string): Observable<any> {
    console.log('started  reallogin 2 - ' + new Date());

    if (!email || !password) {
      return of(null);
    }
    const model = {
      username: email,
      password: password,
    };
    // return this.http.post(`${environment.apiUrl}auth/admin/login`, model).pipe(
    return this.http.post(`${environment.apiUrl}auth/master/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user.token) {
          localStorage.setItem('token', user.token);
          this.dataService.currentUser.token = user.token;
          this.decodedToken = this.jwtHelper.decodeToken(user.token);

          this.setCurrentUser();

          return user;
        } else {
          return null;
        }
      }),
      catchError((err) => {
        this.notification.create(
          'error',
          'Error',
          'Check your credential and try again'
        );
        return null;
        // console.error('err', err);
        // return of(undefined);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.decodedToken = null;
    this.dataService.currentUser = {};
    this.dataService.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ',
      }),
    };
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  unauthorizedRoute() {
    // localStorage.removeItem("token");
    // this.decodedToken = null;
    // this.dataService.currentUser ={};
    // this.dataService.httpOptions={
    //   headers: new HttpHeaders({
    //     Authorization: 'Bearer ',
    //   })
    // };
    // this.router.navigate(['/error/error-1'], {
    this.router.navigate(['/authentication/error-1'], {
      queryParams: {},
    });
  }

  setCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return;
    }

    this.dataService.currentUser.token = token;
    this.decodedToken = this.jwtHelper.decodeToken(token);

    // if (this.decodedToken.role !== 'Master') {
    //   this.logout();
    //   return;
    // }

    if (!this.validToken()) {
      this.logout();
      return;
    }

    this.dataService.currentUser.name = this.decodedToken.name;
    this.dataService.currentUser.role = this.decodedToken.role;
    this.dataService.currentUser.id = this.decodedToken.id;

    this.dataService.currentUser.currency = this.decodedToken.currency;
    this.dataService.currentUser.symbol = this.decodedToken.symbol;
    this.dataService.currentUser.master = this.decodedToken.master;

    this.currentUserSubject.next(this.dataService.currentUser);

    this.dataService.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    if (this.decodedToken.role === 'Master') {
      this.signalR.startConnection();
      this.signalR.addNewRiskApprovalListener();
      this.signalR.addApprovedAndRejectedListener();
    }
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  validToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    let initialDate = this.decodedToken.exp * 1000;

    let date2 = new Date(initialDate);
    let date = this.dataService.returnDateTimeIso(date2);

    let dateNow = this.dataService.returnDateTimeIso();

    //if token is expired ==> remove it (not valid)
    if (date < dateNow) {
      this.logout();

      return false;
    }

    return true;
  }

  // public fields
  currentUser$: Observable<any>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private signalR: SignalRService,
    private notification: NzNotificationService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
}
