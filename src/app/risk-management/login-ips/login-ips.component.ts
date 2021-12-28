import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/shared/services/data.service';
import { TableService } from 'src/app/shared/services/table.service';

interface DataItem {
  username: any;
  name: any;
}

@Component({
  selector: 'app-login-ips',
  templateUrl: './login-ips.component.html',
  styleUrls: ['./login-ips.component.css'],
})
export class LoginIpsComponent implements OnInit {
  isOkLoading: boolean = false;
  isSearchLoading: boolean = false;

  userTransactionsDate: any = [new Date(), new Date()];

  searchInput: any = '';

  dataSource = [];
  orderColumn = [
    {
      title: 'IP',
    },
    {
      title: 'Accounts',
    },
  ];

  constructor(
    private tableSvc: TableService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private dataService: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.LoadUsers();
  }

  LoadUsers() {
    this.isSearchLoading = true;
    this.dataService
      .getLoginLog(
        this.userTransactionsDate[0].toISOString().slice(0, -14),
        this.userTransactionsDate[1].toISOString().slice(0, -14)
      )
      .subscribe(
        (response) => {
          let dataArr = [];
          response.body.forEach((x) => {
            let accounts = '';
            x.users.forEach((user) => {
              if (accounts === '') {
                accounts = user;
              } else {
                accounts = accounts + ', ' + user;
              }
            });
            let obj = { ip: x.ipAddress, accounts: accounts };
            dataArr.push(obj);
          });
          this.dataSource = dataArr;
          this.isSearchLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.isSearchLoading = false;
        }
      );
  }

  search(event?: any): void {
    if (!event) {
      if (!this.isSearchLoading) {
        this.LoadUsers();
      }
    } else {
      if (!this.isSearchLoading && event.keyCode === 13) {
        this.LoadUsers();
      }
    }
  }
}
