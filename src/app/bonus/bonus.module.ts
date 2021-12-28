import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusRoutingModule } from './bonus-routing.module';
import { BonusComponent } from './bonus.component';
import { SharedModule } from '../shared/shared.module';
import { BonusBetOfficeComponent } from './bonus-bet-office/bonus-bet-office.component';
import { BonusOnlineCustomersComponent } from './bonus-online-customers/bonus-online-customers.component';


@NgModule({
  declarations: [
    BonusComponent,
    BonusBetOfficeComponent,
    BonusOnlineCustomersComponent
  ],
  imports: [
    CommonModule,
    BonusRoutingModule,
    SharedModule
  ]
})
export class BonusModule { }
