import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-win-lose',
  templateUrl: './win-lose.component.html',
  styleUrls: ['./win-lose.component.scss'],
})
export class WinLoseComponent implements OnInit {
  userTransactionsDate: any = [new Date(), new Date()];

  userTransactionsLoading: boolean = false;
  customerId: string = '';
  isSuperMaster: boolean = false;

  // Queries
  formToSubmit = {
    stake: 0,
    payout: 0,
    bonus: 0,
    runningBets: 0,
    voided: 0,
    commission: 0,
  };

  report = {
    sportBookStake: 0,
    sportBookRunningBet: 0,
    sportBookPayout: 0,
    sportBookVoided: 0,
    sportBookBonus: 0,
    sportBookComission: 0,
    sportBookProfit: 0,
    layoffStake: 0,
    layoffRunningBet: 0,
    layoffPayout: 0,
    layoffVoided: 0,
    layoffBonus: 0,
    layoffComission: 0,
    layoffProfit: 0,
    deposited: 0,
    depositCost: 0,
    withdraw: 0,
    withdrawCost: 0,
    startCashBalance: 0,
    currentBalance: 0,
    total: 0,
    winLoss: 0,
    creditWithdraw: 0,
    creditDeposit: 0,
  };

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
      .getWinLoseReport(
        this.userTransactionsDate[0].toISOString().slice(0, -14),
        this.userTransactionsDate[1].toISOString().slice(0, -14),
        this.formToSubmit
      )
      .subscribe(
        (resp) => {
          this.report = resp;
          console.log(this.report);
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.userTransactionsLoading = false;
        }
      );
  }

  exportToExcelSheet() {
    this.excel.generateWinLossReport(this.report, {
      startDate: this.userTransactionsDate[0].toISOString().slice(0, -14),
      startTime: `0.0`,
      endDate: this.userTransactionsDate[1].toISOString().slice(0, -14),
      endTime: `23.59`,
    });
  }
}
