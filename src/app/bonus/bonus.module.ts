import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusRoutingModule } from './bonus-routing.module';
import { BonusComponent } from './bonus.component';


@NgModule({
  declarations: [
    BonusComponent
  ],
  imports: [
    CommonModule,
    BonusRoutingModule
  ]
})
export class BonusModule { }
