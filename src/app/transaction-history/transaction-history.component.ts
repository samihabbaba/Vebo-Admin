import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent implements OnInit {
  expandSet = new Set<number>();
  @Input() currentUser: any;
  userTransactionsDate: any = [new Date(), new Date()];
  userTransactionsType: string = 'All';
  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;
  orderColumnTransactions = [
    {
      title: this.translate.instant('User'),
      compare: (a: any, b: any) => a.user.localeCompare(b.user),
    },

    {
      title: this.translate.instant('Amount'),
      compare: (a: any, b: any) => a.amount.localeCompare(b.amount),
    },
    {
      title: this.translate.instant('Payment Type'),
      compare: (a: any, b: any) => a.paymentType.localeCompare(b.paymentType),
    },
    {
      title: this.translate.instant('Type'),
      compare: (a: any, b: any) => a.isDeposite - b.isDeposite,
    },
    {
      title: this.translate.instant('Date'),
      compare: (a: any, b: any) => a.date.localeCompare(b.date),
    },
    {
      title: this.translate.instant('Reference'),
      compare: (a: any, b: any) => a.refrence.localeCompare(b.refrence),
    },
  ];

  constructor(
    private dataService: DataService,
    private message: NzMessageService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getUserTransactions();
  }

  onExpandChange(id: number, event?: any): void {
    if (!this.expandSet.has(id)) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  getUserTransactions() {
    this.userTransactionsLoading = true;
    this.dataService
      .getTransactionHistory(
        this.userTransactionsDate[0].toISOString().slice(0, -14),
        this.userTransactionsDate[1].toISOString().slice(0, -14),
        1,
        10000,
        this.userTransactionsType,
        false,
        false
      )
      .subscribe(
        (resp) => {
          this.userTransactionsData = resp.body.transactions;
          console.log(this.userTransactionsData)
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.userTransactionsLoading = false;
        }
      );
  }
}
