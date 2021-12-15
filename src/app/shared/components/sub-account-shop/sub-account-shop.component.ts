import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sub-account-shop',
  templateUrl: './sub-account-shop.component.html',
  styleUrls: ['./sub-account-shop.component.css'],
})
export class SubAccountShopComponent implements OnInit {
  @Input() subAccounts: any;

  currentUser: any;
  isVisible: boolean = false;
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
  ];

  constructor(
    private dataService: DataService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    console.log(this.subAccounts);
    this.userTransactionsData = this.subAccounts.customer;
  }

  showModal(user: any) {
    this.currentUser = user;
    this.isVisible =true;
  }
}
