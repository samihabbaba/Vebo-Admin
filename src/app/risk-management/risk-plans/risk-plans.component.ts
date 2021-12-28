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
  parentName: any;
  shop: any;
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
  selector: 'app-risk-plans',
  templateUrl: './risk-plans.component.html',
  styleUrls: ['./risk-plans.component.scss'],
})
export class RiskPlansComponent implements OnInit {
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

  passwordForm: any;

  promoterValue: any = 'All';
  filteredPromoters: any[] = [];
  promoters: any[] = [{ name: 'All', value: '' }];
  disablePromoter: boolean = false;

  shopValue: any = 'All';
  filteredShops: any[] = [];
  shops: any[] = [];
  disableShop: boolean = false;

  // Add Form Variables
  addPromoterValue: any = 'All';
  addFilteredPromoters: any[] = [];
  addPromoters: any[] = [{ name: 'All', value: '' }];
  addDisablePromoter: boolean = false;

  addShopValue: any = '';
  addFilteredShops: any[] = [];
  addShops: any[] = [];
  addDisableShop: boolean = false;

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

  laodPromoters() {
    if (this.authService.decodedToken.role === 'Shop') {
      this.disableShop = true;

      return;
    }
    if (this.authService.decodedToken.role === 'Promoter') {
      this.disablePromoter = true;
      this.promoterValue = this.authService.decodedToken.name;
      this.dataService
        .getShopForPromoter(this.authService.decodedToken.id)
        .subscribe(
          (response: any) => {
            this.filteredShops = [{ name: 'All', value: '' }];
            for (const ag of response.body.userList) {
              this.filteredShops.push({
                name: ag.name,
                value: ag.id.toString(),
              });
            }
            this.shops = [...this.filteredShops];
            this.LoadUsers();
          },
          (error) => {}
        );

      return;
    }

    this.dataService.getUsers('Promoter').subscribe(
      async (response: any) => {
        for (const ag of response.body.userList) {
          let promoter = { name: ag.name, value: ag.id.toString() };
          this.promoters.push(promoter);
        }

        this.filteredPromoters = [...this.promoters];

        await this.loadShops();
        this.LoadUsers();
      },
      (error) => {}
    );
  }

  promoterChange(value) {
    this.filteredPromoters = this.promoters.filter(
      (option) => option.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  onPromoterSelection(ev) {
    // // Event will emit if the user selected an input
    if (ev.isUserInput) {
      this.promoterValue = ev.source.nzValue;
      this.loadShops();
    }
  }

  loadShops() {
    return new Promise((resolve, reject) => {
      this.dataService
        .getShopForPromoter(
          this.authService.decodedToken.role === 'Promoter'
            ? this.authService.decodedToken.id
            : this.returnPromoterId()
        )
        .subscribe(
          (response: any) => {
            this.filteredShops = [{ name: 'All', value: '' }];
            for (const ag of response.body.userList) {
              this.filteredShops.push({
                name: ag.name,
                value: ag.id.toString(),
              });
            }
            this.shops = [...this.filteredShops];
            resolve(true);
          },
          (error) => {
            reject(false);
          }
        );
    });
  }

  shopChange(value) {
    this.filteredShops = this.shops.filter(
      (option) => option.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  onShopSelection(ev) {
    if (ev.isUserInput) {
      this.shopValue = ev.source.nzValue;
    }
  }

  returnPromoterId() {
    if (this.authService.decodedToken.role === 'Promoter') {
      return this.authService.decodedToken.id;
    }
    let promoter = this.promoters.find((x) => x.name === this.promoterValue);
    if (!promoter) {
      return '';
    }
    return promoter.value;
  }

  returnShopId() {
    let shop = this.shops.find((x) => x.name === this.shopValue);
    if (!shop) {
      return '';
    }
    return shop.value;
  }

  dataSource = [];

  orderColumn = [
    {
      title: 'Id',
      compare: (a: DataItem, b: DataItem) => a.id.localeCompare(b.id),
    },

    {
      title: 'Promoter',
      compare: (a: DataItem, b: DataItem) =>
        a.parentName.localeCompare(b.parentName),
    },

    {
      title: 'Shop',
      compare: (a: DataItem, b: DataItem) => a.shop.localeCompare(b.shop),
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
    this.laodPromoters();
  }

  LoadUsers() {
    this.isSearchLoading = true;
    this.dataService
      .GetRisks(this.returnPromoterId(), this.returnShopId())
      .subscribe(
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
    this.laodPromotersForAdd();
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
      ShopId: new FormControl('', [Validators.required]),
      categories: new FormControl('A', [Validators.required]),
      categoryHigherNumber: new FormControl(false),
      categoryHigherOdd: new FormControl(false),
      categoryHigherPayout: new FormControl(false),
      isActive: new FormControl(true),
      isOffice: new FormControl(false),
      isOnline: new FormControl(false),
      maxBettingAmount: new FormControl('', [Validators.required]),
      maxPayout: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
  }

  laodPromotersForAdd() {
    if (this.authService.decodedToken.role === 'Promoter') {
      this.addDisablePromoter = true;
      this.addPromoterValue = this.authService.decodedToken.name;
      this.dataService
        .getShopForPromoter(this.authService.decodedToken.id)
        .subscribe(
          (response: any) => {
            this.addFilteredShops = [];
            for (const ag of response.body.userList) {
              this.addFilteredShops.push({
                name: ag.name,
                value: ag.id.toString(),
              });
            }
            this.addShops = [...this.addFilteredShops];
          },
          (error) => {}
        );

      return;
    }

    this.dataService.getUsers('Promoter').subscribe(
      (response: any) => {
        for (const ag of response.body.userList) {
          let promoter = { name: ag.name, value: ag.id.toString() };
          this.addPromoters.push(promoter);
        }

        this.addFilteredPromoters = [...this.addPromoters];

        this.addLoadShops();
      },
      (error) => {}
    );
  }

  addPromoterChange(value) {
    this.addFilteredPromoters = this.addPromoters.filter(
      (option) => option.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  addOnPromoterSelection(ev) {
    // // Event will emit if the user selected an input
    if (ev.isUserInput) {
      this.addPromoterValue = ev.source.nzValue;
      this.addLoadShops();
    }
  }

  addLoadShops() {
    this.dataService
      .getShopForPromoter(
        this.authService.decodedToken.role === 'Promoter'
          ? this.authService.decodedToken.id
          : this.addReturnPromoterId()
      )
      .subscribe(
        (response: any) => {
          this.addFilteredShops = [];
          for (const ag of response.body.userList) {
            this.addFilteredShops.push({
              name: ag.name,
              value: ag.id.toString(),
            });
          }
          this.addShops = [...this.addFilteredShops];
        },
        (error) => {}
      );
  }

  addShopChange(value) {
    this.addFilteredShops = this.addShops.filter(
      (option) => option.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  addOnShopSelection(ev) {
    if (ev.isUserInput) {
      this.addShopValue = ev.source.nzValue;
      this.addForm.get('ShopId').patchValue(this.addReturnShopId());
    }
  }

  addReturnPromoterId() {
    if (this.authService.decodedToken.role === 'Promoter') {
      return this.authService.decodedToken.id;
    }
    let promoter = this.addPromoters.find(
      (x) => x.name === this.addPromoterValue
    );
    if (!promoter) {
      return '';
    }
    return promoter.value;
  }

  addReturnShopId() {
    let shop = this.addShops.find((x) => x.name === this.addShopValue);
    if (!shop) {
      return '';
    }
    return shop.value;
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
      isOffice: new FormControl(false),
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
