import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import {
  registerLocaleData,
  PathLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RiskApprovalNotificationComponent } from './shared/components/risk-approval-notification/risk-approval-notification.component';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { UserInfoComponent } from './users/user-info/user-info.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent,
    RiskApprovalNotificationComponent,
    AuthComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzBreadCrumbModule,
    TemplateModule,
    SharedModule,
    NgChartjsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    ThemeConstantService,
    NzNotificationService,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
