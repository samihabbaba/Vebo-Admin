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
  selector: 'app-risk-approval',
  templateUrl: './risk-approval.component.html',
  styleUrls: ['./risk-approval.component.scss'],
})
export class RiskApprovalComponent implements OnInit {
  expandSet = new Set<number>();
  @Input() currentUser: any;
  @Input() isModal: any;
  userTransactionsDate: any = [new Date(), new Date()];
  userTransactionsType: string = '';

  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;
  parentId: string = '';
  promoterId: string = '';
  userId: string = '';
  shopId: string = '';
  customerId: string = '';
  isSuperMaster: boolean = false;

  // Queries
  selectionMode: string = '';
  betId: any = '';
  shopType = 'All';

  debounceSubject = new Subject<any>();

  selectedParent: any = '';

  returnBetType(type) {
    if (type === 1) {
      return 'Single';
    }

    if (type === 2) {
      return 'Multiple';
    }

    if (type === 3) {
      return 'System';
    }

    return 'Unknown';
  }

  returnStatus(status) {
    if (status == 'Waiting Approval') {
      return status;
    }

    if (status == 'Rejected') {
      return status;
    }

    return 'Approved';
  }

  orderColumnTransactions = [
    {
      title: this.translate.instant('Id'),
      compare: (a: any, b: any) => a.id.localeCompare(b.id),
    },
    {
      title: this.translate.instant('Username'),
      compare: (a: any, b: any) => a.username.localeCompare(b.username),
    },
    {
      title: this.translate.instant('Parent'),
      compare: (a: any, b: any) => a.parentName.localeCompare(b.parentName),
    },

    {
      title: this.translate.instant('Sel. Mode'),
      compare: (a: any, b: any) =>
        a.selectionType.localeCompare(b.selectionType),
    },

    {
      title: this.translate.instant('Bet Type'),
      compare: (a: any, b: any) => a.betType.localeCompare(b.betType),
    },

    {
      title: this.translate.instant('# Sel.'),
      compare: (a: any, b: any) =>
        a.totalSelections.localeCompare(b.totalSelections),
    },

    {
      title: this.translate.instant('Stake'),
      compare: (a: any, b: any) => a.stake.localeCompare(b.stake),
    },

    {
      title: this.translate.instant('E. Pay'),
      compare: (a: any, b: any) => a.payout.localeCompare(b.payout),
    },

    {
      title: this.translate.instant('E. Bonus'),
      compare: (a: any, b: any) => a.bonus.localeCompare(b.bonus),
    },

    {
      title: this.translate.instant('Max Pay'),
      compare: (a: any, b: any) => a.maxPayout.localeCompare(b.maxPayout),
    },

    {
      title: this.translate.instant('Status'),
      compare: (a: any, b: any) => a.status.localeCompare(b.status),
    },

    {
      title: this.translate.instant('Date'),
      compare: (a: any, b: any) => a.date.localeCompare(b.date),
    },

    {
      title: this.translate.instant('Time'),
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
    public authService: AuthenticationService,
    public translate: TranslateService
  ) {
    this.debounceSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.getBets();
      });
  }

  ngOnInit(): void {
    if (this.authService.decodedToken.role === 'Master') {
      this.isMasterUser = true;
    }
    if (this.authService.decodedToken.master == 'True') {
      this.isSuperMaster = true;
    }

    // if (this.currentUser.role && this.currentUser.role == 'Promoter') {
    //   this.parentId = this.currentUser.id;
    //   // this.obj.selectedUserId = '';
    // } else if (this.currentUser.role && this.currentUser.role == 'Shop') {
    //   this.shopId = this.currentUser.id;
    //   // this.obj.selectedUserId = '';
    // } else {
    //   this.customerId = this.currentUser.id;
    // }

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
    // this.updateTotal();

    this.dataService
      .GetApproveBets(
        this.betId,
        this.userTransactionsDate[0].toISOString().slice(0, -14),
        this.userTransactionsDate[1].toISOString().slice(0, -14),
        '',
        '',
        this.parentId,
        '99999',
        '1',
        this.userId,
        this.shopType
      )
      .subscribe(
        (resp) => {
          // if (resp.body.betList.length !== 0) {
          //   this.symbol = resp.betList[0].symbol;
          // }
          this.userTransactionsData = resp.betList;
          console.log(resp);
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.userTransactionsLoading = false;
        }
      );
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

  voidAvailable(date: any) {
    const dateNowIso = new Date().toISOString();
    const datenow2 = new Date(dateNowIso.toString());
    const voidDate = new Date(date); // already converting so no need for the 60 * 3 ?
    const offset = new Date().getTimezoneOffset();
    voidDate.setMinutes(voidDate.getMinutes() - offset);
    const diffMs = datenow2.getTime() - voidDate.getTime(); // the server time is 1h more
    const resultInMinutes = Math.round(diffMs / 60000);
    if (resultInMinutes > 10) {
      return false;
    }
    return true;
  }

  voidBet() {
    let modalObj = {
      id: this.selectedBet.id,
      isDeleted: false,
      isVoid: this.selectedBet.isVoid,
      isPayout: this.selectedBet.isPayout,
      payout: !this.selectedBet.isPayout,
      note: '',
    };
    if (this.authService.decodedToken.master === 'True') {
      this.dataService.setBetVoidMaster(modalObj).subscribe(
        (response) => {
          if (response.status === 200) {
            this.message.create('success', `Bet voided successfully`);
          }
          this.getBets();
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
    } else {
      modalObj.isVoid = !modalObj.isVoid;
      modalObj.payout = !modalObj.payout;

      this.dataService.setBetVoidMaster(modalObj).subscribe(
        (response) => {
          if (response.status === 200) {
            this.message.create('success', `Bet voided successfully`);
          }
          this.getBets();
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
  }

  ShowUserBets(bet) {
    if (this.selectedParent !== bet.userName) {
      this.selectedParent = bet.userName;
      this.parentId = '';
      this.userId = bet.userId;
      this.getBets();
    } else {
      this.selectedParent = '';
      this.userId = '';
      this.parentId = '';
      this.getBets();
    }
  }

  ShowParentBets(bet) {
    if (this.selectedParent !== bet.parentName) {
      this.selectedParent = bet.parentName;

      this.userId = '';

      this.parentId = bet.parentId;
      this.getBets();
    } else {
      this.selectedParent = '';
      this.userId = '';
      this.parentId = '';
      this.getBets();
    }
  }

  acceptBet() {
    this.dataService.acceptBet(this.selectedBet).subscribe(
      (resp) => {
        this.message.create('info', `Bet approved`);
        this.getBets();
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

  rejectBet() {
    this.dataService.rejectBet(this.selectedBet).subscribe(
      (resp) => {
        this.message.create('info', `Bet rejected`);
        this.getBets();
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
}
