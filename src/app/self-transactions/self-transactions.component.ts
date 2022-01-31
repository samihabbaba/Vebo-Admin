import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from '../shared/services/authentication.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-self-transactions',
  templateUrl: './self-transactions.component.html',
  styleUrls: ['./self-transactions.component.css'],
})
export class SelfTransactionsComponent implements OnInit {
  expandSet = new Set<number>();
  @Input() currentUser: any;
  userTransactionsDate: any = [new Date(), new Date()];
  userTransactionsType: string = 'All';
  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;
  orderColumnTransactions = [
    {
      title: this.translate.instant('Amount'),
      compare: (a: any, b: any) => a.amount - b.amount,
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
    public translate: TranslateService,
    public authService: AuthenticationService
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
        this.authService.decodedToken.id,
        1,
        10000,
        this.userTransactionsType,
      )
      .subscribe(
        (resp) => {
          this.userTransactionsData = resp.body.transactions;
          console.log(this.userTransactionsData);
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.userTransactionsLoading = false;
        }
      );
  }
}
