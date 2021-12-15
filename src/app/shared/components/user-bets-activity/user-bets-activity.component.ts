import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-bets-activity',
  templateUrl: './user-bets-activity.component.html',
  styleUrls: ['./user-bets-activity.component.css']
})
export class UserBetsActivityComponent implements OnInit {
  expandSet = new Set<number>();
  @Input() currentUser: any;
  userTransactionsDate: Date[] = [new Date(), new Date()];
  userTransactionsType: string = 'All';
  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;
  orderColumnTransactions = [
    {
      title: 'User',
      compare: (a: any, b: any) => a.user.localeCompare(b.user),
    },
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
      .getTransactionHistory(
        this.userTransactionsDate[0].toISOString().slice(0,-14),
        this.userTransactionsDate[1].toISOString().slice(0,-14),
        1,
        10000,
        this.userTransactionsType,
        false,
        true,
        this.currentUser.id
      )
      .subscribe(
        (resp) => {
          this.userTransactionsData = resp.body.transactions;
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.userTransactionsLoading = false;
        }
      );
  }

}
