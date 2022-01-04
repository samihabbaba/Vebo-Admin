import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { WinLoseComponent } from './win-lose/win-lose.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ReportsComponent,
    WinLoseComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
