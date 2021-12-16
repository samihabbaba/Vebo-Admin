import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetsRoutingModule } from './bets-routing.module';
import { BetsComponent } from './bets.component';
import { ViewBetsComponent } from './view-bets/view-bets.component';
import { BetOfficeComponent } from './bet-office/bet-office.component';
import { RiskApprovalComponent } from './risk-approval/risk-approval.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BetsComponent,
    ViewBetsComponent,
    BetOfficeComponent,
    RiskApprovalComponent,
  ],
  imports: [CommonModule, BetsRoutingModule, SharedModule],
})
export class BetsModule {}
