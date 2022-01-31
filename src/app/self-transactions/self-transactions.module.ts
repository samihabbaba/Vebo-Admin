import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfTransactionsRoutingModule } from './self-transactions-routing.module';
import { SelfTransactionsComponent } from './self-transactions.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SelfTransactionsComponent],
  imports: [CommonModule, SelfTransactionsRoutingModule, SharedModule],
})
export class SelfTransactionsModule {}
