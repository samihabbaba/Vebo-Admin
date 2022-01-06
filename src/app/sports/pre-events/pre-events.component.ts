import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-pre-events',
  templateUrl: './pre-events.component.html',
  styleUrls: ['./pre-events.component.scss'],
})
export class PreEventsComponent implements OnInit {
  isOkLoading: boolean = false;
  // Modal Variables
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  detailForm: FormGroup;
  editingUser: any;

  @Input() sportsList = [];
  @Input() regionList = [];
  leagueList = [];

  dataSource = [];

  selectedSport: any = '';
  selectedRegion: any = '';
  selectedLeague: any = '';

  subs$: Subscription;
  changedOddsList: any[] = [];

  orderColumn = [
    {
      title: 'Home Team',
      compare: (a: any, b: any) => a.homeTeam.localeCompare(b.homeTeam),
    },
    {
      title: 'Away Team',
      compare: (a: any, b: any) => a.awayTeam.localeCompare(b.awayTeam),
    },
    {
      title: 'Date',
      compare: (a: any, b: any) => a.date - b.date,
    },
    {
      title: 'Odd Change',
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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.selectedSport = this.sportsList[0]?.id;
    this.selectedRegion = this.regionList[0]?.id;
    this.getLeagues();
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

  regionDropdownChange(event) {
    this.dataService.GetLeagues(this.selectedSport, event).subscribe(
      (response) => {
        this.leagueList = [];
        for (let l of response.body) {
          this.leagueList.push({ name: l.leagueName, id: l.leagueId });
        }
        this.selectedLeague = this.leagueList[0]?.id;
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }

  LoadUsers() {
    this.dataService
      .getPreMatches(this.selectedLeague)
      .subscribe(
        (response) => {
          this.dataSource = response.body;
          console.log(this.dataSource)
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
        }
      );
  }

  getLeagues() {
    this.dataService
      .GetLeagues(this.selectedSport, this.selectedRegion)
      .subscribe(
        (response) => {
          this.leagueList = [];
          for (let l of response.body) {
            this.leagueList.push({ name: l.leagueName, id: l.leagueId });
          }
          this.selectedLeague = this.leagueList[0]?.id;
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
        this.dataService.disableMatch(this.editingUser, false).subscribe(
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

  checkIfMatchOddChanged(event) {
    if (this.changedOddsList == null || this.changedOddsList.length == 0) {
      return false;
    }
    return this.changedOddsList.some(
      (x) =>
        x.homeTeam === event.homeTeam &&
        x.awayTeam === event.awayTeam &&
        x.date === event.date
    );
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
