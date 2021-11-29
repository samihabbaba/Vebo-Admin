import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportsRoutingModule } from './sports-routing.module';
import { SportsComponent } from './sports.component';


@NgModule({
  declarations: [
    SportsComponent
  ],
  imports: [
    CommonModule,
    SportsRoutingModule
  ]
})
export class SportsModule { }
