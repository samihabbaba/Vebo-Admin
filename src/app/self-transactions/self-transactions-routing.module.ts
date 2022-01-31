import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfTransactionsComponent } from './self-transactions.component';

const routes: Routes = [{ path: '', component: SelfTransactionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfTransactionsRoutingModule {}
