import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';


import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { TableService } from './services/table.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { UserTransactionsComponent } from './components/user-transactions/user-transactions.component';
import { UserBetsComponent } from './components/user-bets/user-bets.component';
import { UserBetsActivityComponent } from './components/user-bets-activity/user-bets-activity.component';
import { SubAccountPromoterComponent } from './components/sub-account-promoter/sub-account-promoter.component';
import { SubAccountShopComponent } from './components/sub-account-shop/sub-account-shop.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { PrintSelectionComponent } from './components/print-selection/print-selection.component';
import { NgxPrintModule } from 'ngx-print';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

const antdModule = [
  NzButtonModule,
  NzCardModule,
  NzAvatarModule,
  NzRateModule,
  NzBadgeModule,
  NzProgressModule,
  NzRadioModule,
  NzTableModule,
  NzDropDownModule,
  NzTimelineModule,
  NzTabsModule,
  NzTagModule,
  NzListModule,
  NzCalendarModule,
  NzFormModule,
  NzModalModule,
  NzSelectModule,
  NzUploadModule,
  NzInputModule,
  NzPaginationModule,
  NzDatePickerModule,
  NzCheckboxModule,
  NzMessageModule,
  NzToolTipModule,
  NzAlertModule,
  NzDividerModule,
  NzDescriptionsModule,
  NzSwitchModule,
  NzPopconfirmModule,
  NzInputNumberModule,
  NzAutocompleteModule
]

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        NzIconModule,
        PerfectScrollbarModule,
        SearchPipe,
        ...antdModule,
        UserTransactionsComponent,
        UserBetsComponent,
        UserBetsActivityComponent,
        SubAccountPromoterComponent,
        SubAccountShopComponent,

    ],
    imports: [
        RouterModule,
        CommonModule,
        NzIconModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPrintModule,
        ...antdModule
    ],
    declarations: [
        SearchPipe,
        UserTransactionsComponent,
        UserBetsComponent,
        UserBetsActivityComponent,
        SubAccountPromoterComponent,
        SubAccountShopComponent,
        PrintSelectionComponent,
    ],
    providers: [
        ThemeConstantService,
        TableService
    ]
})

export class SharedModule { }
