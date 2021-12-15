import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.css'],
})
export class UserTransactionsComponent implements OnInit {
  expandSet = new Set<number>();
  @Input() currentUser: any;
  userTransactionsDate: any = [new Date(), new Date()];
  userTransactionsType: string = 'All';
  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;
  orderColumnTransactions = [
    {
      title: 'Amount',
      compare: (a: any, b: any) => a.amount.localeCompare(b.amount),
    },
    {
      title: 'Payment Type',
      compare: (a: any, b: any) => a.paymentType.localeCompare(b.paymentType),
    },
    {
      title: 'Type',
      compare: (a: any, b: any) => a.isDeposite - b.isDeposite,
    },
    {
      title: 'Date',
      compare: (a: any, b: any) => a.date.localeCompare(b.date),
    },
    {
      title: 'Reference',
      compare: (a: any, b: any) => a.refrence.localeCompare(b.refrence),
    },
  ];

  constructor(
    private dataService: DataService,
    private message: NzMessageService
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
      .getTransactionForUser(
        this.userTransactionsDate[0].toISOString().slice(0, -14),
        this.userTransactionsDate[1].toISOString().slice(0, -14),
        this.currentUser.id,
        1,
        10000,
        this.userTransactionsType
      )
      .subscribe(
        (resp) => {
          this.userTransactionsData = resp.body.transactions;
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Insufficient credit`);
          this.userTransactionsLoading = false;
        }
      );
  }
}
