import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sub-account-promoter',
  templateUrl: './sub-account-promoter.component.html',
  styleUrls: ['./sub-account-promoter.component.css'],
})
export class SubAccountPromoterComponent implements OnInit {
  @Input() subAccounts: any;

  expandSet = new Set<number>();
  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;
  orderColumnTransactions = [
    {
      title: 'Username',
      compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
    },
    {
      title: 'Name',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
    },

    {
      title: 'Balance',
      compare: (a: any, b: any) => a.balance.localeCompare(b.balance),
    },
    {
      title: 'Net Balance',
      compare: (a: any, b: any) =>
        a.networkBalance.localeCompare(b.networkBalance),
    },
  ];

  constructor(
    private dataService: DataService,
    private message: NzMessageService
  ) {}


  onExpandChange(id: number, event?: any): void {
    if (!this.expandSet.has(id)) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  ngOnInit(): void {
    console.log(this.subAccounts)
    this.userTransactionsData = this.subAccounts.shops;
  }
}
