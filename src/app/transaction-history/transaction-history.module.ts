import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionHistoryRoutingModule } from './transaction-history-routing.module';
import { TransactionHistoryComponent } from './transaction-history.component';
import { SharedModule } from '../shared/shared.module';
import { TransactionHistoryInternalComponent } from './transaction-history-internal/transaction-history-internal.component';
import { TransactionHistoryBetComponent } from './transaction-history-bet/transaction-history-bet.component';


@NgModule({
  declarations: [
    TransactionHistoryComponent,
    TransactionHistoryInternalComponent,
    TransactionHistoryBetComponent
  ],
  imports: [
    CommonModule,
    TransactionHistoryRoutingModule,
    SharedModule
  ]
})
export class TransactionHistoryModule { }
