import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  expandSet = new Set<number>();
  userTransactionsDate: any = [new Date(), new Date()];

  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;

  onExpandChange(item: any, event?: any): void {
    if (!this.expandSet.has(item.id)) {
      this.expandSet.add(item.id);
    } else {
      this.expandSet.delete(item.id);
    }
  }

  orderColumnTransactions = [
    {
      title: this.translate.instant('Id'),
      compare: (a: any, b: any) => a.id - b.id,
    },
    {
      title: this.translate.instant('Name'),
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: this.translate.instant('Deposit'),
      compare: (a: any, b: any) => a.deposit - b.deposit,
    },

    {
      title: this.translate.instant('Deposit Cost'),
      compare: (a: any, b: any) => a.depositCost - b.depositCost,
    },

    {
      title: this.translate.instant('Withdraw'),
      compare: (a: any, b: any) => a.withdraw - b.withdraw,
    },

    {
      title: this.translate.instant('Withdraw Cost'),
      compare: (a: any, b: any) => a.withdrawCost - b.withdrawCost,
    },

    {
      title: this.translate.instant('Total Cost'),
      compare: (a: any, b: any) => a.totalCost - b.totalCost,
    },
  ];

  orderColumnTransactions2 = [
    {
      title: this.translate.instant('Id'),
      compare: (a: any, b: any) => a.id - b.id,
    },
    {
      title: this.translate.instant('Username'),
      compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
    },
    {
      title: this.translate.instant('Name'),
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
    },

    {
      title: this.translate.instant('Date'),
      compare: (a: any, b: any) => a.date.localeCompare(b.date),
    },

    {
      title: this.translate.instant('Time'),
      compare: (a: any, b: any) => a.date.localeCompare(b.date),
    },

    {
      title: this.translate.instant('Currency'),
      compare: (a: any, b: any) => a.currency.localeCompare(b.currency),
    },

    {
      title: this.translate.instant('Amount'),
      compare: (a: any, b: any) => a.amount - b.amount,
    },

    {
      title: this.translate.instant('Payment Method'),
      compare: (a: any, b: any) =>
        a.paymentMethod.localeCompare(b.paymentMethod),
    },
  ];

  constructor(
    public dataService: DataService,
    private message: NzMessageService,
    private excel: ExcelService,
    public authService: AuthenticationService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getBets();
  }

  getBets() {
    this.userTransactionsLoading = true;

    this.dataService
      .getPaymentReport(
        this.userTransactionsDate[0].toISOString().slice(0, -14),
        this.userTransactionsDate[1].toISOString().slice(0, -14),
        99999,
        1
      )
      .subscribe(
        (resp) => {
          this.userTransactionsData = resp;
          console.log(this.userTransactionsData);
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.userTransactionsLoading = false;
        }
      );
  }

  exportToExcelSheet() {
    this.excel.generatepaymentReport(this.userTransactionsData, {
      startDate: this.userTransactionsDate[0].toISOString().slice(0, -14),
      startTime: `0.0`,
      endDate: this.userTransactionsDate[1].toISOString().slice(0, -14),
      endTime: `$23.59`,
    });
  }
}
