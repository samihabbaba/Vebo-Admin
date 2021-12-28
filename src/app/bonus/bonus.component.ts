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
  percent: any;
  minBetNo: any;
  minAmount: any;
  isActive: any;
}

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css'],
})
export class BonusComponent implements OnInit {
  isOkLoading: boolean = false;
  // Modal Variables
  isAddVisible: boolean = false;
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  addForm: FormGroup;
  usernameAvi: any;

  detailForm: FormGroup;
  editingUser: any;

  promoterValue: any = 'All';
  filteredPromoters: any[] = [];
  promoters: any[] = [{ name: 'All', value: '' }];
  disablePromoter: boolean = false;

  shopValue: any = 'All';
  filteredShops: any[] = [];
  shops: any[] = [];
  disableShop: boolean = false;

  // Add Form Variables
  addPromoterValue: any = '';
  addFilteredPromoters: any[] = [];
  addPromoters: any[] = [];
  addDisablePromoter: boolean = false;

  addShopValue: any = '';
  addFilteredShops: any[] = [];
  addShops: any[] = [];
  addDisableShop: boolean = false;

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
    this.laodPromoters();
  }

  LoadUsers() {
    this.isSearchLoading = true;
    this.dataService
      .getBonus(this.returnPromoterId(), this.returnShopId())
      .subscribe(
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
    this.laodPromotersForAdd();
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
      ShopId: new FormControl('', [Validators.required]),
      isActive: new FormControl(true),
      isOffice: new FormControl(false),
      isOnline: new FormControl(false),
      minAmount: new FormControl('', [Validators.required]),
      minBetNo: new FormControl('', [Validators.required]),
      percent: new FormControl('', [Validators.required]),
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
      isOnline: new FormControl(false),
      minAmount: new FormControl(this.editingUser.minAmount, [
        Validators.required,
      ]),
      minBetNo: new FormControl(this.editingUser.minBetNo, [
        Validators.required,
      ]),
      parentId: new FormControl(this.editingUser.parentId),
      parentName: new FormControl(this.editingUser.parentId),
      percent: new FormControl(this.editingUser.percent, [Validators.required]),
      shop: new FormControl(this.editingUser.shop),
      shopId: new FormControl(this.editingUser.shopId),
      symbol: new FormControl(this.editingUser.symbol),
    });
  }
}
