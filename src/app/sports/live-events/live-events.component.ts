import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-live-events',
  templateUrl: './live-events.component.html',
  styleUrls: ['./live-events.component.scss'],
})
export class LiveEventsComponent implements OnInit {
  isOkLoading: boolean = false;
  // Modal Variables
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  detailForm: FormGroup;
  editingUser: any;

  sports = [];

  subs$: Subscription;
  changedOddsList: any[] = [];

  orderColumn = [
    {
      title: this.translate.instant('Home Team'),
      compare: (a: any, b: any) => a.homeTeam.localeCompare(b.homeTeam),
    },
    {
      title: this.translate.instant('Away Team'),
      compare: (a: any, b: any) => a.awayTeam.localeCompare(b.awayTeam),
    },
    {
      title: this.translate.instant('Date'),
      compare: (a: any, b: any) => a.date - b.date,
    },
    {
      title: this.translate.instant('Odd Change'),
      // compare: (a: any, b: any) => a.isActive - b.isActive,
    },
    {
      title: '',
    },
  ];

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private dataService: DataService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    // this.LoadUsers();
    this.subs$ = this.dataService.reloadEvents.subscribe((resp) => {
      if (resp) {
        setTimeout(() => {
          this.LoadUsers();
          this.getAllChangedOdds();
        }, 1000);
      }
    });
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }

  LoadUsers() {
    this.dataService.getLiveMatches().subscribe(
      (response) => {
        // this.sports = [];
        // this.sports = this.zone.run(() => response.body);
        this.sports = response.body;
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }



  disableMatch(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to disable the match ${item.homeTeam} - ${item.awayTeam}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.dataService.disableMatch(this.editingUser, true).subscribe(
          (response) => {
            // this.LoadUsers();
            this.dataService.reloadEvents.next(true);
            this.message.create('success', `Match disabled successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
    });
  }


  checkIfMatchOddChanged(event){
    if(this.changedOddsList == null || this.changedOddsList.length ==0){
      return false;
    }
    return this.changedOddsList.some(x=>
      x.homeTeam === event.homeTeam
      && x.awayTeam === event.awayTeam
      && x.date === event.date);
  }

  getAllChangedOdds() {
    this.dataService.getOddsChangedList().subscribe(
      (resp) => {
        this.changedOddsList = resp.body.filter((x) => x.manualOddEnabled);
      },
      (error) => {}
    );
  }

  // DETAILS FORM

  showDetailModal(item: any): void {
    this.editingUser = item;
    this.isDetailVisible = true;
    console.log(
      this.editingUser.markets[
        this.getMainMarketIndex(this.editingUser.markets)
      ].results
    );
    console.log(this.editingUser);
  }

  submitDetailForm() {
    this.isOkLoading = true;
    let odds: any = [];
    this.editingUser.markets[
      this.getMainMarketIndex(this.editingUser.markets)
    ].results.forEach((element) => {
      odds.push({
        sourceName: element.sourceName?.value ? element.sourceName?.value : '',
        name: element.name.value,
        value: element.odds,
      });
    });

    let modalToSend = {
      homeTeam: this.editingUser.homeTeam,
      awayTeam: this.editingUser.awayTeam,
      date: this.editingUser.date,
      isEnabled: true,
      odds: odds,
    };
    console.log(modalToSend);
    this.dataService.changeOddsForMatch(modalToSend).subscribe(
      (response) => {
        this.dataService.reloadEvents.next(true);
        this.message.create('success', `Odds updated successfully`);
        this.isDetailVisible = false;
        this.isOkLoading = false;
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
        this.isOkLoading = false;
      }
    );
  }

  getMainMarketIndex(markets) {
    let index = markets.findIndex((x) => x.isMain == true);
    return index;
  }
}
