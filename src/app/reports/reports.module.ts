import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { WinLoseComponent } from './win-lose/win-lose.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    ReportsComponent,
    WinLoseComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
