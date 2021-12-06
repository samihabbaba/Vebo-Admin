import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';

import { FullLayout_ROUTES } from './shared/routes/full-layout.routes';
import { CommonLayout_ROUTES } from './shared/routes/common-layout.routes';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './shared/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: CommonLayout_ROUTES,
    canActivate: [AuthGuard]

  },
  {
    path: '',
    component: FullLayoutComponent,
    children: FullLayout_ROUTES,
    canActivate: [AuthGuard]

  },

  { path: 'auth/login', component: AuthComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
