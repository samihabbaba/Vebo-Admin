import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import * as _ from 'lodash';

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
      title: 'Event Name',
      compare: (a: any, b: any) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: 'Sport',
      compare: (a: any, b: any) => a.sport.localeCompare(b.sport),
    },
    {
      title: 'Region',
      compare: (a: any, b: any) => a.region.localeCompare(b.region),
    },

    {
      title: 'League',
      compare: (a: any, b: any) => a.league.localeCompare(b.league),
    },

    {
      title: 'Selection',
      compare: (a: any, b: any) => a.selection.localeCompare(b.selection),
    },

    {
      title: 'Date',
      compare: (a: any, b: any) => a.date - b.date,
    },

    {
      title: 'Stake',
      compare: (a: any, b: any) => a.stake - b.stake,
    },

    {
      title: 'Single Risk',
      compare: (a: any, b: any) => a.singleRisk.localeCompare(b.singleRisk),
    },

    {
      title: 'Multiple Risk',
      compare: (a: any, b: any) => a.multipleRisk.localeCompare(b.multipleRisk),
    },

    {
      title: 'Total Slip',
      compare: (a: any, b: any) => a.totalSlip.localeCompare(b.totalSlip),
    },
  ];

  constructor(
    public dataService: DataService,
    private message: NzMessageService,
    private excel: ExcelService,
    public authService: AuthenticationService
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
