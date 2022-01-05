import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-live-events',
  templateUrl: './live-events.component.html',
  styleUrls: ['./live-events.component.css']
})
export class LiveEventsComponent implements OnInit {

  isOkLoading: boolean = false;
  // Modal Variables
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  detailForm: FormGroup;
  editingUser: any;

  sports = [];

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
    this.LoadUsers()
  }

  LoadUsers() {
    this.dataService.getLiveMatches().subscribe(
      (response) => {
        this.sports = response.body;
        console.log(this.sports)
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }


  activate(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to activate the sport ${item.name}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isActive = true;
        this.dataService.updateSport(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Sport activated successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
    });
  }

  deactivate(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to deactivate the sport ${item.name}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isActive = false;
        this.dataService.updateSport(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Sport deactivated successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
    });
  }

  // DETAILS FORM

  showDetailModal(item: any): void {
    this.editingUser = item;
    this.initializeDetailForm();
    this.isDetailVisible = true;
    console.log(this.editingUser);
  }

  submitDetailForm() {
    this.isOkLoading = true;
    const obj = this.detailForm.getRawValue();
    this.editingUser.category = obj.category;
    this.editingUser.isActive = obj.isActive;
    this.dataService.updateSport(this.editingUser).subscribe(
      (response) => {
        this.LoadUsers();
        this.message.create('success', `Sport updated successfully`);
        this.isDetailVisible = false;
        this.isOkLoading = false;
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
        this.isOkLoading = false;
      }
    );
  }

  initializeDetailForm() {
    this.detailForm = this.fb.group({
      category: new FormControl(this.editingUser.category, [
        Validators.required,
      ]),
      isActive: new FormControl(this.editingUser.isActive),
    });
  }
}
