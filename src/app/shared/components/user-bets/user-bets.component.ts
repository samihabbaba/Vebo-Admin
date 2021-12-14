import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { AuthHttpService } from '../../services/auth-http.service';
import { AuthenticationService } from '../../services/authentication.service';
import { DataService } from '../../services/data.service';
import { ExcelService } from '../../services/excel.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-bets',
  templateUrl: './user-bets.component.html',
  styleUrls: ['./user-bets.component.css'],
})
export class UserBetsComponent implements OnInit {
  expandSet = new Set<number>();
  @Input() currentUser: any;
  userTransactionsDate: any = [new Date(), new Date()];
  userTransactionsType: string = '';
  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;
  switchValue: boolean = true;
  parentId: string = '';
  shopId: string = '';
  customerId: string = '';
  isSuperMaster: boolean = false;
  orderColumnTransactions = [
    {
      title: 'Id',
      compare: (a: any, b: any) => a.id.localeCompare(b.id),
    },
    {
      title: 'Cust. Name',
      compare: (a: any, b: any) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: '∑ Selections',
      compare: (a: any, b: any) =>
        a.totalSelections.localeCompare(b.totalSelections),
    },

    {
      title: 'Odds',
      compare: (a: any, b: any) => a.odds.localeCompare(b.odds),
    },

    {
      title: 'Stake',
      compare: (a: any, b: any) => a.stake.localeCompare(b.stake),
    },

    {
      title: 'Bonus',
      compare: (a: any, b: any) => a.bonus.localeCompare(b.bonus),
    },

    {
      title: 'Max Payout',
      compare: (a: any, b: any) => a.maxPayout.localeCompare(b.maxPayout),
    },

    {
      title: 'Real Win',
      compare: (a: any, b: any) => a.realWin.localeCompare(b.realWin),
    },

    {
      title: 'Net',
      compare: (a: any, b: any) => a.net.localeCompare(b.net),
    },

    {
      title: 'Status',
      compare: (a: any, b: any) => a.status.localeCompare(b.status),
    },

    {
      title: 'Date',
      compare: (a: any, b: any) => a.date.localeCompare(b.date),
    },

    {
      title: 'Time',
      compare: (a: any, b: any) => a.time.localeCompare(b.time),
    },
  ];

  betsReportObj = {
    bets: [],
    total: {},
  };

  total: any = {
    totalBets: 0,
    ew: 0,
    eb: 0,
    ewb: 0,
    rwb: 0,
    net: 0,
    totalSelections: 0,
    winningSelection: 0,
    stake: 0,
  };
  symbol: string = '';
  isMasterUser: boolean = false;

  eventsSubject: Subject<number> = new Subject<number>();
  emitEventToChild(id) {
    this.eventsSubject.next(id);
  }

  constructor(
    public dataService: DataService,
    private message: NzMessageService,
    private excel: ExcelService,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.authService.decodedToken.role === 'Master') {
      this.isMasterUser = true;
    }
    if (this.authService.decodedToken.master == 'True') {
      this.isSuperMaster = true;
    }

    if (this.currentUser.role && this.currentUser.role == 'Promoter') {
      this.parentId = this.currentUser.id;
      // this.obj.selectedUserId = '';
    } else if (this.currentUser.role && this.currentUser.role == 'Shop') {
      this.shopId = this.currentUser.id;
      // this.obj.selectedUserId = '';
    } else {
      this.customerId = this.currentUser.id;
    }

    this.getBets();
  }

  onExpandChange(item: any, event?: any): void {
    if (!this.expandSet.has(item.id)) {
      this.dataService.GetBetById(item.id).subscribe(
        (resp) => {
          item.selections = resp.selections;
          item.systemBetRefrence = resp.systemBetRefrence;

          item.grouped = {};
          item.combos = [];
          item.grouped = _.mapValues(
            _.groupBy(item.systemBetRefrence, 'combo'),
            (clist) => clist.map((events) => _.omit(events, 'combo'))
          );
          for (const combo in item.grouped) {
            const obj = { name: combo, ref: item.grouped[combo] };
            item.combos.push(obj);
          }
          console.log(item);
          this.expandSet.add(item.id);
        },
        (error) => {}
      );
    } else {
      this.expandSet.delete(item.id);
    }
  }

  getBets() {
    this.userTransactionsLoading = true;
    this.updateTotal();
    this.dataService
      .getBetsForUserAndDate(
        this.dataService.convertDateTimeToIso(this.userTransactionsDate[0]),
        this.dataService.convertDateTimeToIso(this.userTransactionsDate[1]),
        this.customerId,
        this.userTransactionsType,
        1,
        99999,
        this.switchValue,
        this.shopId,
        this.parentId
      )
      .subscribe(
        (resp) => {
          if (resp.body.betList.length !== 0) {
            this.symbol = resp.body.betList[0].symbol;
          }
          this.userTransactionsData = resp.body.betList;
          this.userTransactionsLoading = false;
          console.log(this.userTransactionsData);
        },
        (error) => {
          this.message.create('error', `Insufficient credit`);
          this.userTransactionsLoading = false;
        }
      );
  }

  updateTotal() {
    this.dataService
      .getTotalBets(
        '',
        this.dataService.convertDateTimeToIso(this.userTransactionsDate[0]),
        this.dataService.convertDateTimeToIso(this.userTransactionsDate[1]),
        this.customerId,
        '',
        this.userTransactionsType,
        '',
        0,
        0,
        0,
        0,
        99999,
        1,
        this.parentId,
        this.shopId, // shop
        this.switchValue,
        ''
      )
      .subscribe((bets: any) => {
        this.total = bets;
      });
  }

  async extractBetReport(seletions = false) {
    if (seletions) {
      this.dataService
        .getCustomerSelectionsReport(
          this.dataService.convertDateTimeToIso(this.userTransactionsDate[0]),
          this.dataService.convertDateTimeToIso(this.userTransactionsDate[1]),
          this.currentUser.id,
          this.switchValue
        )
        .subscribe(
          (resp) => {
            this.excel.generateCustomerSelectionReport(
              resp,
              this.userTransactionsDate[0],
              this.userTransactionsDate[1]
            );
          },
          (error) => {}
        );
    } else {
      // bets ( not selectoins )
      await this.getBetsForReport();
      await this.getTotalForReport();

      this.excel.generateBetsReport(
        this.betsReportObj,
        this.dataService.convertDateTimeToIso(this.userTransactionsDate[0]),
        this.dataService.convertDateTimeToIso(this.userTransactionsDate[1])
      );
    }
  }

  getBetsForReport() {
    return new Promise((resolve, reject) => {
      this.dataService
        .GetBetsReport(
          '',
          this.dataService.convertDateTimeToIso(this.userTransactionsDate[0]),
          this.dataService.convertDateTimeToIso(this.userTransactionsDate[1]),
          this.customerId,
          '',
          this.userTransactionsType,
          '',
          0,
          0,
          0,
          0,
          99999,
          1,
          this.parentId,
          this.shopId,
          this.switchValue,
          ''
        )
        .subscribe(
          (resp) => {
            this.betsReportObj.bets = resp;
            resolve(true);
          },
          (error) => {
            reject(false);
          }
        );
    });
  }

  getTotalForReport() {
    return new Promise((resolve, reject) => {
      this.dataService
        .getTotalBets(
          '',
          this.dataService.convertDateTimeToIso(this.userTransactionsDate[0]),
          this.dataService.convertDateTimeToIso(this.userTransactionsDate[1]),
          this.customerId,
          '',
          this.userTransactionsType,
          '',
          0,
          0,
          0,
          0,
          99999,
          0,
          this.parentId, // here is parent id, but we want to send the parent id as shop id in the query,
          // that's why i sent the parent id in the shop id place
          this.shopId, // shop
          this.switchValue,
          ''
        )
        .subscribe(
          (bets: any) => {
            this.betsReportObj.total = bets;
            resolve(true);
          },
          (error) => {
            reject(false);
          }
        );
    });
  }

  // Selection section

  returnSelectionStatus(s) {
    if (s.isVoid) {
      return 'Void';
    }

    if (s.isPending) {
      return 'Pending';
    }
    if (s.isWin) {
      return 'Win';
    }
    return 'Lose';
  }

  setAsWin(bet: any) {
    this.dataService.setBetSelectionWin(bet.betId, bet.id).subscribe(
      (resp) => {
        if (resp.status === 200) {
          bet.isWin = true;
          bet.isPending = false;
        }
      },
      (error) => {
        if (error.error.errors != undefined) {
          error.error.errors.forEach((err) => {
            this.message.create('error', `${err.message}  "\n"`);
          });
        } else {
          this.message.create('error', `${error.message}`);
        }
      }
    );
  }

  setAsLoss(bet: any) {
    this.dataService.setBetSelectionLoss(bet.betId, bet.id).subscribe(
      (resp) => {
        if (resp.status === 200) {
          bet.isWin = false;
          bet.isPending = false;
        }
      },
      (error) => {
        if (error.error.errors != undefined) {
          error.error.errors.forEach((err) => {
            this.message.create('error', `${err.message}  "\n"`);
          });
        } else {
          this.message.create('error', `${error.message}`);
        }
      }
    );
  }

  setAsVoid(bet: any) {
    this.dataService.setBetSelectionVoid(bet.betId, bet.id).subscribe(
      (resp) => {
        if (resp.status === 200) {
          bet.isVoid = true;
          bet.isPending = false;
        }
      },
      (error) => {
        if (error.error.errors != undefined) {
          error.error.errors.forEach((err) => {
            this.message.create('error', `${err.message}  "\n"`);
          });
        } else {
          this.message.create('error', `${error.message}`);
        }
      }
    );
  }

  isVisible = false;
  selectedBet: any;
  newOdd = 0;

  showModal(bet: any): void {
    this.selectedBet = bet;
    console.log(this.selectedBet);
    this.isVisible = true;
    this.newOdd = this.selectedBet.rate;
  }
  applyOddChange() {
    let bet = this.selectedBet;
    this.dataService.changeBetsOdds(bet.betId, this.newOdd).subscribe(
      (resp: any) => {
        if (resp.status === 200) {
          bet.rate = resp.body.selections[0].rate;

          this.dataService.reloadBetsObs.next({
            doIt: true,
            betId: bet.betId,
            actionDate: resp.body.actionDate,
            odds: resp.body.odds,
            bonus: resp.body.bonus,
            payout: resp.body.payout,
            maxPayout: resp.body.maxPayout,
            realWin: resp.body.realWin,
            net: resp.body.net,
          });
          this.dataService.reloadBetsObs.next({
            doIt: false,
          });

          this.message.create('success', `Odd changed successfully`);
          this.isVisible = false;
        }
      },
      (error) => {
        if (error.error.errors != undefined) {
          error.error.errors.forEach((err) => {
            this.message.create('error', `${err.message}  "\n"`);
          });
        } else {
          this.message.create('error', `${error.message}`);
        }
      }
    );
  }

  // Combo section
  returnExpectedWin(ref): number {
    let result: any = ref.stake * ref.rate;
    return result.toFixed(2);
  }
}
