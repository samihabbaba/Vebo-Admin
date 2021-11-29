import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { WinLoseComponent } from './win-lose/win-lose.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'win-lose' },
  { path: 'win-lose', component: WinLoseComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
