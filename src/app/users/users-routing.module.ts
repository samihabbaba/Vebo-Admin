import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetOfficeComponent } from './bet-office/bet-office.component';
import { CustomerComponent } from './customer/customer.component';
import { MasterComponent } from './master/master.component';
import { OnlineCustomerComponent } from './online-customer/online-customer.component';
import { PromoterComponent } from './promoter/promoter.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'master' },
  { path: 'master', component: MasterComponent },
  { path: 'promoter', component: PromoterComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'bet-office', component: BetOfficeComponent },
{ path: 'online-customer', component: OnlineCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
