import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MasterComponent } from './master/master.component';
import { PromoterComponent } from './promoter/promoter.component';
import { ShopComponent } from './shop/shop.component';
import { CustomerComponent } from './customer/customer.component';
import { BetOfficeComponent } from './bet-office/bet-office.component';
import { OnlineCustomerComponent } from './online-customer/online-customer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    MasterComponent,
    PromoterComponent,
    ShopComponent,
    CustomerComponent,
    BetOfficeComponent,
    OnlineCustomerComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
