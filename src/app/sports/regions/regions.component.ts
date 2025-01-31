import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent implements OnInit {
  isOkLoading: boolean = false;
  // Modal Variables
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  detailForm: FormGroup;
  editingUser: any;

  @Input() sportsList = [];
  @Output() regionList = new EventEmitter();
  dataSource = [];

  selectedSport: any = '';

  orderColumn = [
    {
      title: this.translate.instant('Id'),
      compare: (a: any, b: any) => a.regionId - b.regionId,
    },
    {
      title: this.translate.instant('Name'),
      compare: (a: any, b: any) => a.regionName.localeCompare(b.regionName),
    },
    {
      title: this.translate.instant('Order Number'),
      compare: (a: any, b: any) => a.orderNumber - b.orderNumber,
    },
    {
      title: this.translate.instant('Active'),
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
    private fb: FormBuilder,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.selectedSport = this.sportsList[0]?.id;
    this.LoadUsers();
  }

  LoadUsers() {
    this.dataService.GetRegions(this.selectedSport).subscribe(
      (response) => {
        this.dataSource = response.body;
        let regions = [];
        for ( let r of this.dataSource) {
          regions.push({name: r.regionName, id: r.regionId});
        }
        this.regionList.emit(regions);
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }

  statusChange(value: string): void {}

  activate(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to activate the region ${item.regionName}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isActive = true;
        this.dataService.updateRegion(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Region activated successfully`);
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
      nzTitle: `Do you Want to deactivate the region ${item.regionName}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isActive = false;
        this.dataService.updateRegion(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Region deactivated successfully`);
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
    this.editingUser.isActive = obj.isActive;
    this.dataService.updateRegion(this.editingUser).subscribe(
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
      isActive: new FormControl(this.editingUser.isActive),
    });
  }
}
