import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss'],
})
export class SportsComponent implements OnInit {
  sports: any[] = [];
  sportsList: any[];


  constructor(
    private message: NzMessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getSports();
  }

  getSports() {
    this.dataService.GetSports().subscribe(
      (response) => {
        this.sports = response.body;
        this.sportsList = [];
        for (let s of this.sports) {
          this.sportsList.push({ name: s.name, id: s.sportId });
        }
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }


}
