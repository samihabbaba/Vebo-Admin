import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpRestrictionComponent } from './ip-restriction/ip-restriction.component';
import { LoginIpsComponent } from './login-ips/login-ips.component';
import { PlayerModeComponent } from './player-mode/player-mode.component';
import { RiskCalculationComponent } from './risk-calculation/risk-calculation.component';
import { RiskPlansComponent } from './risk-plans/risk-plans.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'risk-plans' },
  { path: 'risk-plans', component: RiskPlansComponent },
  { path: 'risk-calculation', component: RiskCalculationComponent },
  { path: 'player-mode', component: PlayerModeComponent },
  { path: 'ip-restriction', component: IpRestrictionComponent },
  { path: 'login-ips', component: LoginIpsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskManagementRoutingModule {}
