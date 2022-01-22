import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUp1Component } from './sign-up-1/sign-up-1.component';
import { Error1Component } from './error-1/error-1.component';
import { Error2Component } from './error-2/error-2.component';

const routes: Routes = [
  {
    path: 'sign-up-1',
    component: SignUp1Component,
    data: {
      title: 'Sign Up 1',
    },
  },

  {
    path: 'error-1',
    component: Error1Component,
    data: {
      title: 'Error 1',
    },
  },
  {
    path: 'error-2',
    component: Error2Component,
    data: {
      title: 'Error 2',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
