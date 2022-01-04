import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/shared/services/data.service';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-available-sports',
  templateUrl: './available-sports.component.html',
  styleUrls: ['./available-sports.component.css'],
})
export class AvailableSportsComponent implements OnInit {
  isOkLoading: boolean = false;
  // Modal Variables
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  detailForm: FormGroup;
  editingUser: any;

  dropdownOptions: any[] = [
    { label: 'In Stock', value: 'inStock' },
    { label: 'Out of Stock', value: 'outOfStock' },
  ];

  selectedStatus: string = '';

  dataSource = [];

  orderColumn = [
    {
      title: 'Id',
      compare: (a: any, b: any) => a.sportId - b.sportId,
    },
    {
      title: 'Name',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      compare: (a: any, b: any) => a.category.localeCompare(b.category),
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
    this.LoadUsers();
  }

  LoadUsers() {
    this.isSearchLoading = true;
    this.dataService.GetSports().subscribe(
      (response) => {
        this.dataSource = response.body;
        console.log(this.dataSource);
        this.isSearchLoading = false;
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
        this.isSearchLoading = false;
      }
    );
  }

  statusChange(value: string): void {}

  activate(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to activate the sport ${item.name}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        // this.editingUser.isMasterAccount = false;
        // this.editingUser.isDeleted = false;
        // this.editingUser.isSuspended = true;
        // this.dataService.submitChangesForUser(this.editingUser).subscribe(
        //   (response) => {
        //     this.LoadUsers();
        //     this.message.create('success', `User suspended successfully`);
        //   },
        //   (error) => {
        //     this.message.create('error', `Something went wrong`);
        //   }
        // );
      },
    });
  }

  deactivate(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to deactivate the sport ${item.name}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        // this.editingUser.isMasterAccount = false;
        // this.editingUser.isDeleted = false;
        // this.editingUser.isSuspended = false;
        // this.dataService.submitChangesForUser(this.editingUser).subscribe(
        //   (response) => {
        //     this.LoadUsers();
        //     this.message.create('success', `User unsuspended successfully`);
        //   },
        //   (error) => {
        //     this.message.create('error', `Something went wrong`);
        //   }
        // );
      },
    });
  }

  // DETAILS FORM

  showDetailModal(item: any): void {
    this.editingUser = item;
    this.initializeDetailForm();
    this.isDetailVisible = true;
    console.log(this.editingUser)
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
      category: new FormControl(this.editingUser.category, [Validators.required]),
      isActive: new FormControl(this.editingUser.isActive),
    });
  }
}
