import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit {
  isOkLoading: boolean = false;
  // Modal Variables
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  detailForm: FormGroup;
  editingUser: any;

  @Input() sportsList = [];
  @Input() regionList = [];

  dataSource = [];

  selectedSport: any = '';
  selectedRegion: any = '';

  orderColumn = [
    {
      title: 'Id',
      compare: (a: any, b: any) => a.leagueId - b.leagueId,
    },
    {
      title: 'Name',
      compare: (a: any, b: any) => a.leagueName.localeCompare(b.leagueName),
    },

    {
      title: 'Margin',
      compare: (a: any, b: any) => a.margin - b.margin,
    },

    {
      title: 'Category',
      compare: (a: any, b: any) => a.category.localeCompare(b.category),
    },
    {
      title: 'Order Number',
      compare: (a: any, b: any) => a.orderNumber - b.orderNumber,
    },

    {
      title: 'Popular',
      compare: (a: any, b: any) => a.isPopular - b.isPopular,
    },
    {
      title: 'Active',
      compare: (a: any, b: any) => a.isActive - b.isActive,
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
    this.LoadUsers();
  }

  LoadUsers() {
    this.dataService
      .GetLeagues(this.selectedSport, this.selectedRegion)
      .subscribe(
        (response) => {
          this.dataSource = response.body;
          console.log(this.dataSource);
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
        }
      );
  }

  statusChange(value: string): void {}

  setPopular(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to set popular the league ${item.leagueName}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isPopular = true;
        this.dataService.updateLeague(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Updated successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
    });
  }

  setUnpopular(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to set popular the league ${item.leagueName}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isPopular = false;
        this.dataService.updateLeague(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Updated successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
    });
  }

  activate(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to activate the league ${item.regionName}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isActive = true;
        this.dataService.updateLeague(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Leagues activated successfully`);
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
      nzTitle: `Do you Want to deactivate the league ${item.regionName}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isActive = false;
        this.dataService.updateLeague(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Leagues deactivated successfully`);
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
    this.editingUser.orderNumber = obj.orderNumber;
    this.editingUser.category = obj.category;
    this.editingUser.margin = obj.margin;
    this.editingUser.isActive = obj.isActive;
    this.dataService.updateLeague(this.editingUser).subscribe(
      (response) => {
        this.LoadUsers();
        this.message.create('success', `Region updated successfully`);
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
      orderNumber: new FormControl(this.editingUser.orderNumber, [
        Validators.required,
      ]),
      category: new FormControl(this.editingUser.category, [
        Validators.required,
      ]),
      margin: new FormControl(this.editingUser.margin, [
        Validators.required,
      ]),
      isActive: new FormControl(this.editingUser.isActive),
    });
  }
}
