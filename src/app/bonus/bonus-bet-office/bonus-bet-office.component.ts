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
  selector: 'app-bonus-bet-office',
  templateUrl: './bonus-bet-office.component.html',
  styleUrls: ['./bonus-bet-office.component.css']
})
export class BonusBetOfficeComponent implements OnInit {

  expandSet = new Set<number>();

  isOkLoading: boolean = false;
  // Modal Variables
  isAddVisible: boolean = false;
  isDetailVisible: boolean = false;
  isPasswordVisible: boolean = false;

  isSearchLoading: boolean = false;

  addForm: FormGroup;
  usernameAvi: any;

  detailForm: FormGroup;
  editingUser: any;

  categoriesList = [
    'A',
    'B',
    'C',
    'D',
    'AB',
    'AC',
    'AD',
    'BC',
    'BD',
    'CD',
    'ABC',
    'ABD',
    'BCD',
    'ABCD',
  ];

  dataSource = [];

  orderColumn = [
    {
      title: 'Id',
      compare: (a: DataItem, b: DataItem) => a.id.localeCompare(b.id),
    },

    {
      title: 'Name',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    },
    {
      title: 'Max Bet. Amount',
      compare: (a: DataItem, b: DataItem) =>
        a.maxBettingAmount.localeCompare(b.maxBettingAmount),
    },
    {
      title: 'Max Payout',
      compare: (a: DataItem, b: DataItem) =>
        a.maxPayout.localeCompare(b.maxPayout),
    },

    {
      title: 'Cate. High. Odd',
      compare: (a: DataItem, b: DataItem) =>
        a.categoryHigherOdd - b.categoryHigherOdd,
    },
    {
      title: 'Cate. High. Pay',
      compare: (a: DataItem, b: DataItem) =>
        a.categoryHigherPayout - b.categoryHigherPayout,
    },
    {
      title: 'Cate. High. Num.',
      compare: (a: DataItem, b: DataItem) =>
        a.categoryHigherNumber - b.categoryHigherNumber,
    },

    {
      title: 'Categories',
      compare: (a: DataItem, b: DataItem) =>
        a.categories.localeCompare(b.categories),
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
    this.dataService.GetRisksNotShops('true', 'false').subscribe(
      (response) => {
        this.dataSource = response;
        this.isSearchLoading = false;
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
        this.isSearchLoading = false;
      }
    );
  }

  search(event?: any): void {
    if (!event) {
      if (!this.isSearchLoading) {
        this.LoadUsers();
      }
    } else {
      if (!this.isSearchLoading && event.keyCode === 13) {
        this.LoadUsers();
      }
    }
  }

  activate(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to activate the plan ${item.name}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isDeleted = false;
        this.editingUser.isActive = true;
        this.dataService.updateRisk(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Plan activated successfully`);
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
      nzTitle: `Do you Want to deactivate the plan ${item.name}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isDeleted = false;
        this.editingUser.isActive = false;
        this.dataService.updateRisk(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Plan deactivated successfully`);
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
      nzTitle: `Are you sure delete the plan ${item.name}?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.editingUser.isActive = false;
        this.editingUser.isDeleted = true;
        this.dataService.updateRisk(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Plan deleted successfully`);
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
    this.dataService.addRisk(obj).subscribe(
      (response) => {
        if (response.status == 201) {
          this.LoadUsers();
          this.message.create('success', `Plan added successfully`);
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
      // ShopIdToAdd: new FormControl('', [Validators.required]),
      // shopId: new FormControl('', [Validators.required]),
      categories: new FormControl('A', [Validators.required]),
      categoryHigherNumber: new FormControl(false),
      categoryHigherOdd: new FormControl(false),
      categoryHigherPayout: new FormControl(false),
      isActive: new FormControl(true),
      isOffice: new FormControl(true),
      isOnline: new FormControl(false),
      maxBettingAmount: new FormControl('', [Validators.required]),
      maxPayout: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
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
    this.editingUser.name = obj.name;
    this.editingUser.categories = obj.categories;
    this.editingUser.isActive = obj.isActive;
    this.editingUser.categoryHigherPayout = obj.categoryHigherPayout;
    this.editingUser.categoryHigherNumber = obj.categoryHigherNumber;
    this.editingUser.categoryHigherOdd = obj.categoryHigherOdd;
    this.editingUser.maxPayout = obj.maxPayout;
    this.editingUser.maxBettingAmount = obj.maxBettingAmount;
    this.dataService.updateRisk(this.editingUser).subscribe(
      (response) => {
        this.LoadUsers();
        this.message.create('success', `Policy updated successfully`);
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
      agencyId: new FormControl(0),
      id: new FormControl(this.editingUser.id),
      categories: new FormControl('A', [Validators.required]),
      categoryHigherNumber: new FormControl(
        this.editingUser.categoryHigherNumber,
        [Validators.required]
      ),
      categoryHigherOdd: new FormControl(this.editingUser.categoryHigherOdd, [
        Validators.required,
      ]),
      categoryHigherPayout: new FormControl(
        this.editingUser.categoryHigherPayout,
        [Validators.required]
      ),
      isActive: new FormControl(this.editingUser.isActive),
      isOffice: new FormControl(true),
      isOnline: new FormControl(false),
      maxBettingAmount: new FormControl(this.editingUser.maxBettingAmount, [
        Validators.required,
      ]),
      maxPayout: new FormControl(this.editingUser.maxPayout, [
        Validators.required,
      ]),
      name: new FormControl(this.editingUser.name, [Validators.required]),
    });
  }


}
