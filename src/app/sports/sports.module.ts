import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportsRoutingModule } from './sports-routing.module';
import { SportsComponent } from './sports.component';
import { SharedModule } from '../shared/shared.module';
import { AvailableSportsComponent } from './available-sports/available-sports.component';
import { RegionsComponent } from './regions/regions.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { LiveEventsComponent } from './live-events/live-events.component';
import { PreEventsComponent } from './pre-events/pre-events.component';
import { DisabledEventsComponent } from './disabled-events/disabled-events.component';


@NgModule({
  declarations: [
    SportsComponent,
    AvailableSportsComponent,
    RegionsComponent,
    LeaguesComponent,
    LiveEventsComponent,
    PreEventsComponent,
    DisabledEventsComponent
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    SharedModule
  ]
})
export class SportsModule { }
