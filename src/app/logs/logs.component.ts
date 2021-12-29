import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  expandSet = new Set<number>();
  @Input() currentUser: any;
  @Input() isModal: any;
  userTransactionsDate: any = [new Date(), new Date()];
  userTransactionsType: string = '';

  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;

  // Queries

  username: any = '';
  ipAddress: any = '';

  level = '';
  LogsType = ['Warn', 'Error', 'Info'];

  type = '';
  TypesList = ['Login', 'Risk', 'Bet', 'Sport', 'Users', 'Payment', 'Bonus'];

  orderColumnTransactions = [
    {
      title: 'Id',
      compare: (a: any, b: any) => a.id.localeCompare(b.id),
    },
    {
      title: 'Level',
      compare: (a: any, b: any) => a.level.localeCompare(b.level),
    },
    {
      title: 'Logged At',
      compare: (a: any, b: any) => a.logged.localeCompare(b.logged),
    },

    {
      title: 'Message',
      compare: (a: any, b: any) => a.message.localeCompare(b.message),
    },

    {
      title: 'Type',
      compare: (a: any, b: any) => a.type.localeCompare(b.type),
    },

    {
      title: 'User',
      compare: (a: any, b: any) => a.user.localeCompare(b.user),
    },

    {
      title: 'IP',
      compare: (a: any, b: any) => a.ip.localeCompare(b.ip),
    },

    {
      title: 'User Agent',
      compare: (a: any, b: any) => a.userAgent.localeCompare(b.userAgent),
    },
  ];

  constructor(
    public dataService: DataService,
    private message: NzMessageService,
    private excel: ExcelService,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // if (this.authService.decodedToken.role === 'Master') {
    //   this.isMasterUser = true;
    // }
    // if (this.authService.decodedToken.master == 'True') {
    //   this.isSuperMaster = true;
    // }

    this.getBets();
  }

  getBets() {
    this.userTransactionsLoading = true;
    // this.updateTotal();

    this.dataService
      .getAllLogsForDate(
        this.userTransactionsDate[0].toISOString().slice(0, -14),
        this.userTransactionsDate[1].toISOString().slice(0, -14),
        this.level,
        this.type,
        this.username,
        this.ipAddress,
        1,
        99999
      )
      .subscribe(
        (resp) => {
          this.userTransactionsData = resp.logList;
          console.log(resp);
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.userTransactionsLoading = false;
        }
      );
  }
}
