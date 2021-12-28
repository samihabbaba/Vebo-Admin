import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataService } from 'src/app/shared/services/data.service';
import { TableService } from 'src/app/shared/services/table.service';

interface DataItem {
  id: any;
  percent: any;
  minBetNo: any;
  minAmount: any;
  isActive: any;
}

interface DataItem {
  id: any;
  name: any;
  maxBettingAmount: any;
  maxPayout: any;
  categoryHigherOdd: any;
  categoryHigherPayout: any;
  categoryHigherNumber: any;
  categories: any;
  isActive: any;
}
@Component({
  selector: 'app-bonus-online-customers',
  templateUrl: './bonus-online-customers.component.html',
  styleUrls: ['./bonus-online-customers.component.css'],
})
export class BonusOnlineCustomersComponent implements OnInit {
  isOkLoading: boolean = false;
  // Modal Variables
  isAddVisible: boolean = false;
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  addForm: FormGroup;
  usernameAvi: any;

  detailForm: FormGroup;
  editingUser: any;

  dataSource = [];

  orderColumn = [
    {
      title: 'Id',
      compare: (a: DataItem, b: DataItem) => a.id.localeCompare(b.id),
    },

    {
      title: 'Percent',
      compare: (a: DataItem, b: DataItem) => a.percent.localeCompare(b.percent),
    },

    {
      title: 'Min. Bet No.',
      compare: (a: DataItem, b: DataItem) =>
        a.minBetNo.localeCompare(b.minBetNo),
    },

    {
      title: 'Min. Amount',
      compare: (a: DataItem, b: DataItem) =>
        a.minAmount.localeCompare(b.minAmount),
    },

    {
      title: 'Active',
      compare: (a: DataItem, b: DataItem) => a.isActive - b.isActive,
    },
    {
      title: '',
    },
  ];

  constructor(
    private tableSvc: TableService,
    public authService: AuthenticationService,
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
    this.dataService.getBonusNotShop('false', 'true').subscribe(
      (response) => {
        this.dataSource = response.body;
        this.isSearchLoading = false;
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
        this.isSearchLoading = false;
      }
    );
  }

  activate(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to activate the bonus ${item.id}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isDeleted = false;
        this.editingUser.isActive = true;
        this.dataService.updateBonus(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Bonus activated successfully`);
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
      nzTitle: `Do you Want to deactivate the bonus ${item.id}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isDeleted = false;
        this.editingUser.isActive = false;
        this.dataService.updateBonus(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Bonus deactivated successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
    });
  }

  showDeleteConfirm(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Are you sure delete the bonus ${item.id}?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.editingUser.isActive = false;
        this.editingUser.isDeleted = true;
        this.dataService.updateBonus(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Bonus deleted successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
      nzCancelText: 'No',
    });
  }

  // ADD FORM

  showAddModal(): void {
    this.initializeAddForm();
    this.isAddVisible = true;
  }

  submitAddForm() {
    this.isOkLoading = true;
    const obj = this.addForm.getRawValue();
    this.dataService.AddBonus(obj).subscribe(
      (response) => {
        if (response.status == 201) {
          this.LoadUsers();
          this.message.create('success', `Bonus added successfully`);
          this.isAddVisible = false;
        }
        this.isOkLoading = false;
      },
      (error) => {
        error.error.errors.forEach((error) => {
          this.message.create('error', `${error.message}`);
        });

        this.isOkLoading = false;
      }
    );
  }

  initializeAddForm() {
    this.addForm = this.fb.group({
      shopId: new FormControl(this.dataService.currentUser.id),
      isActive: new FormControl(true),
      isOffice: new FormControl(false),
      isOnline: new FormControl(true),
      minAmount: new FormControl('', [Validators.required]),
      minBetNo: new FormControl('', [Validators.required]),
      percent: new FormControl('', [Validators.required]),
    });
  }

  // DETAILS FORM

  showDetailModal(item: any): void {
    this.editingUser = item;
    this.initializeDetailForm();
    this.isDetailVisible = true;
  }

  submitDetailForm() {
    this.isOkLoading = true;
    const obj = this.detailForm.getRawValue();
    this.editingUser.minAmount = obj.minAmount;
    this.editingUser.minBetNo = obj.minBetNo;
    this.editingUser.percent = obj.percent;
    this.editingUser.isActive = obj.isActive;
    this.dataService.updateBonus(this.editingUser).subscribe(
      (response) => {
        this.LoadUsers();
        this.message.create('success', `Bonus updated successfully`);
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
      id: new FormControl(this.editingUser.id),
      currency: new FormControl(this.editingUser.currency),
      isActive: new FormControl(this.editingUser.isActive),
      isOffice: new FormControl(false),
      isOnline: new FormControl(true),
      minAmount: new FormControl(this.editingUser.minAmount, [
        Validators.required,
      ]),
      minBetNo: new FormControl(this.editingUser.minBetNo, [
        Validators.required,
      ]),
      // parentId: new FormControl(this.editingUser.parentId),
      // parentName: new FormControl(this.editingUser.parentId),
      percent: new FormControl(this.editingUser.percent, [Validators.required]),
      // shop: new FormControl(this.editingUser.shop),
      // shopId: new FormControl(this.editingUser.shopId),
      symbol: new FormControl(this.editingUser.symbol),
    });
  }
}
