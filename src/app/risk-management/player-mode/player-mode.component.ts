import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-player-mode',
  templateUrl: './player-mode.component.html',
  styleUrls: ['./player-mode.component.scss'],
})
export class PlayerModeComponent implements OnInit {
  expandSet = new Set<number>();
  @Input() currentUser: any;
  @Input() isModal: any;
  userTransactionsDate: any = [new Date(), new Date()];
  userTransactionsType: string = '';

  userTransactionsData: any[] = [];
  userTransactionsLoading: boolean = false;

  // Queries

  selectedSport: string = '';
  selectedregion: string = '';
  selectedLeague: string = '';

  sportList: any[] = [];
  regionList: any[] = [];
  leagueList: any[] = [];

  orderColumnTransactions = [
    {
      title: this.translate.instant('Event Name'),
      compare: (a: any, b: any) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: this.translate.instant('Sport'),
      compare: (a: any, b: any) => a.sport.localeCompare(b.sport),
    },
    {
      title: this.translate.instant('Region'),
      compare: (a: any, b: any) => a.region.localeCompare(b.region),
    },

    {
      title: this.translate.instant('League'),
      compare: (a: any, b: any) => a.league.localeCompare(b.league),
    },

    {
      title: this.translate.instant('Selection'),
      compare: (a: any, b: any) => a.selection.localeCompare(b.selection),
    },

    {
      title: this.translate.instant('Date'),
      compare: (a: any, b: any) => a.date - b.date,
    },

    {
      title: this.translate.instant('Stake'),
      compare: (a: any, b: any) => a.stake - b.stake,
    },

    {
      title: this.translate.instant('Single Risk'),
      compare: (a: any, b: any) => a.singleRisk.localeCompare(b.singleRisk),
    },

    {
      title: this.translate.instant('Multiple Risk'),
      compare: (a: any, b: any) => a.multipleRisk.localeCompare(b.multipleRisk),
    },

    {
      title: this.translate.instant('Total Slip'),
      compare: (a: any, b: any) => a.totalSlip.localeCompare(b.totalSlip),
    },
  ];

  constructor(
    public dataService: DataService,
    private message: NzMessageService,
    private excel: ExcelService,
    public authService: AuthenticationService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getSports();
    this.getRegions();
    this.getLeagues();
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
      .getRiskMost(
        this.userTransactionsDate[0].toISOString().slice(0, -14),
        this.userTransactionsDate[1].toISOString().slice(0, -14),
        this.selectedSport,
        this.selectedregion,
        this.selectedLeague
      )
      .subscribe(
        (resp) => {
          this.userTransactionsData = resp.body;
          console.log(this.userTransactionsData);
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.userTransactionsLoading = false;
        }
      );
  }

  sportsChange(ev) {
    this.dataService.GetRegions(ev).subscribe(
      (response) => {
        this.regionList = [];
        for (let r of response.body) {
          this.regionList.push({ name: r.regionName, id: r.regionId });
        }
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }

  regionChange(ev) {
    this.dataService.GetLeagues(this.selectedSport, ev).subscribe(
      (response) => {
        this.leagueList = [];
        for (let l of response.body) {
          this.leagueList.push({ name: l.leagueName, id: l.leagueId });
        }
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }

  getSports() {
    this.dataService.GetSports().subscribe(
      (response) => {
        this.sportList = [];
        for (let s of response.body) {
          this.sportList.push({ name: s.name, id: s.sportId });
        }
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }

  getRegions() {
    this.dataService.GetRegions(this.selectedSport).subscribe(
      (response) => {
        this.regionList = [];
        for (let r of response.body) {
          this.regionList.push({ name: r.regionName, id: r.regionId });
        }
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }

  getLeagues() {
    this.dataService
      .GetLeagues(this.selectedSport, this.selectedregion)
      .subscribe(
        (response) => {
          this.leagueList = [];
          for (let l of response.body) {
            this.leagueList.push({ name: l.leagueName, id: l.leagueId });
          }
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
        }
      );
  }
}
