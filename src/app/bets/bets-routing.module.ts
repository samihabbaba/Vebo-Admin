import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetOfficeComponent } from './bet-office/bet-office.component';
import { RiskApprovalComponent } from './risk-approval/risk-approval.component';
import { ViewBetsComponent } from './view-bets/view-bets.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view-bets' },
  { path: 'view-bets', component: ViewBetsComponent },
  { path: 'bet-office', component: BetOfficeComponent },
  { path: 'risk-approval', component: RiskApprovalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetsRoutingModule { }
