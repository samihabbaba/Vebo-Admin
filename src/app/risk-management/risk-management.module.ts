import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskManagementRoutingModule } from './risk-management-routing.module';
import { RiskManagementComponent } from './risk-management.component';
import { RiskPlansComponent } from './risk-plans/risk-plans.component';
import { RiskCalculationComponent } from './risk-calculation/risk-calculation.component';
import { PlayerModeComponent } from './player-mode/player-mode.component';
import { IpRestrictionComponent } from './ip-restriction/ip-restriction.component';
import { LoginIpsComponent } from './login-ips/login-ips.component';


@NgModule({
  declarations: [
    RiskManagementComponent,
    RiskPlansComponent,
    RiskCalculationComponent,
    PlayerModeComponent,
    IpRestrictionComponent,
    LoginIpsComponent
  ],
  imports: [
    CommonModule,
    RiskManagementRoutingModule
  ]
})
export class RiskManagementModule { }
