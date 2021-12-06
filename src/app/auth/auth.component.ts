import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../shared/interfaces/user.model';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  hasError: boolean;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  submit() {
    console.log('started 1 - ' + new Date());
    this.hasError = false;
    const loginSubscr = this.authService
      .realLogin(this.f.userName.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: UserModel) => {
        console.log('started in subscribe 7 - ' + new Date());

        if (user) {
          // this.router.navigate([this.  returnUrl]);

          if (this.authService.decodedToken.role === 'Office') {
            this.router.navigate(['/bets/bet-office']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
