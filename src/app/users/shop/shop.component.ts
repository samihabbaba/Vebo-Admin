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

interface DataItem {
  username: any;
  name: any;
  parent: any;
  cashBalance: any;
  creditBalance: any;
  realBalance: any;
  isActive: any;
  isSuspended: any;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  CurrencyList = [
    { name: 'TL', symbol: '₺' },
    { name: 'USD', symbol: '$' },
    { name: 'STG', symbol: '£' },
    { name: 'EURO', symbol: '€' },
  ];

  expandSet = new Set<number>();
  promoterAuto: any;
  promotersList: any[] = [];
  allPromoters: any;
  filteredPromotersList: any[] = [];
  userIsPromoter: boolean = false;

  isOkLoading: boolean = false;
  // Modal Variables
  isAddVisible: boolean = false;
  isDetailVisible: boolean = false;
  isPasswordVisible: boolean = false;
  isDepositVisible: boolean = false;
  isWithdrawVisible: boolean = false;
  isHistoryVisible: boolean = false;
  isBalanceVisible: boolean = false;

  isSearchLoading: boolean = false;

  addForm: FormGroup;
  usernameAvi: any;

  detailForm: FormGroup;
  editingUser: any;

  passwordForm: any;

  depositForm: FormGroup;
  withdrawForm: FormGroup;

  // balance form
  balanceModel: any;

  // User Transactions variables
  userTransactionsDate: any = [new Date(), new Date()];
  userTransactionsType: string = 'All';
  userTransactionsLoading: boolean = false;
  userTransactionsData: any[] = [];

  onExpandChange(id: number, event?: any): void {
    if (!this.expandSet.has(id)) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  dropdownOptions: any[] = [
    { label: 'In Stock', value: 'inStock' },
    { label: 'Out of Stock', value: 'outOfStock' },
  ];

  selectedStatus: string = '';
  searchInput: any = '';

  dataSource = [];

  orderColumn = [
    {
      title: 'Username',
      compare: (a: DataItem, b: DataItem) =>
        a.username.localeCompare(b.username),
    },
    {
      title: 'Name',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    },
    {
      title: 'Parent',
      compare: (a: DataItem, b: DataItem) => a.parent.localeCompare(b.parent),
    },
    {
      title: 'Cash Balance',
      compare: (a: DataItem, b: DataItem) =>
        a.cashBalance.localeCompare(b.cashBalance),
    },
    {
      title: 'Credit Balance',
      compare: (a: DataItem, b: DataItem) =>
        a.creditBalance.localeCompare(b.creditBalance),
    },
    {
      title: 'Real Balance',
      compare: (a: DataItem, b: DataItem) =>
        a.realBalance.localeCompare(b.realBalance),
    },
    {
      title: 'Active',
      compare: (a: DataItem, b: DataItem) => a.isActive - b.isActive,
    },
    {
      title: 'Suspended',
      compare: (a: DataItem, b: DataItem) => a.isSuspended - b.isSuspended,
    },
    {
      title: '',
    },
  ];

  orderColumnTransactions = [
    {
      title: 'Amount',
      compare: (a: any, b: any) => a.amount.localeCompare(b.amount),
    },
    {
      title: 'Payment Type',
      compare: (a: any, b: any) => a.paymentType.localeCompare(b.paymentType),
    },
    {
      title: 'Type',
      compare: (a: any, b: any) => a.isDeposite - b.isDeposite,
    },
    {
      title: 'Date',
      compare: (a: any, b: any) => a.date.localeCompare(b.date),
    },
    {
      title: 'Reference',
      compare: (a: any, b: any) => a.refrence.localeCompare(b.refrence),
    },
  ];

  constructor(
    private tableSvc: TableService,
    private message: NzMessageService,
    private modalService: NzModalService,
    public dataService: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.dataService.currentUser.role === 'Promoter') {
      this.userIsPromoter = true;
    } else {
      this.userIsPromoter = false;
    }
    this.LoadUsers();
  }

  LoadUsers() {
    this.isSearchLoading = true;
    this.dataService.getUsers('Shop', this.searchInput).subscribe(
      (response) => {
        if (response.status == 200) {
          this.dataSource = response.body.userList;
          console.log(this.dataSource);
        }
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

  statusChange(value: string): void {}

  suspendConfirm(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to suspend the user ${item.username}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isMasterAccount = false;
        this.editingUser.isDeleted = false;
        this.editingUser.isSuspended = true;
        this.dataService.submitChangesForUser(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `User suspended successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
    });
  }

  unsuspendConfirm(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to unsuspend the user ${item.username}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isMasterAccount = false;
        this.editingUser.isDeleted = false;
        this.editingUser.isSuspended = false;
        this.dataService.submitChangesForUser(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `User unsuspended successfully`);
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
      nzTitle: `Are you sure delete the user ${item.username}?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.editingUser.isActive = false;
        this.editingUser.isDeleted = true;
        this.dataService.submitChangesForUser(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `User deleted successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
      nzCancelText: 'No',
    });
  }

  // Get Promoters
  LoadPromoters() {
    this.dataService.getUsers('Promoter').subscribe(
      (response: any) => {
        this.promotersList = [];
        this.allPromoters = response.body.userList;
        response.body.userList.forEach((x) => {
          this.promotersList.push(x.name);
        });
        this.filteredPromotersList = this.promotersList;
        if (this.promotersList.length > 0) {
          this.promoterAuto = this.promotersList[0];
        }
      },
      (error) => {}
    );
  }

  promoterChange(value) {
    this.filteredPromotersList = this.promotersList.filter(
      (option) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  // ADD FORM

  showAddModal(): void {
    this.LoadPromoters();
    this.initializeAddForm();
    this.isAddVisible = true;
  }

  submitAddForm() {
    this.dataService
      .usernameAvailable(this.addForm.get('username').value)
      .subscribe((response) => {
        if (response.body) {
          this.isOkLoading = true;
          const obj = this.addForm.getRawValue();
          if (!this.userIsPromoter) {
            let selectedPromoter = this.allPromoters.find(
              (x) => x.name === this.promoterAuto
            );
            if (!selectedPromoter) {
              this.message.create('error', `Please choose promoter from the list`);
              this.isOkLoading = false;
              return;
            } else {
              console.log(selectedPromoter);
              obj.parentId = selectedPromoter.id;
              obj.parentName = selectedPromoter.name;
            }
          }
          this.dataService.submitNewUserForm(obj).subscribe(
            (response) => {
              if (response.status == 201) {
                this.LoadUsers();
                this.message.create('success', `User added successfully`);
                this.isAddVisible = false;
              }
              this.isOkLoading = false;
            },
            (error) => {
              this.message.create('error', `Something went wrong`);
              this.isOkLoading = false;
            }
          );
        } else {
          this.usernameAvi = 'This username is not available';
          this.addForm.get('username').setErrors({ incorrect: true });
        }
      });
  }

  initializeAddForm() {
    this.addForm = this.fb.group({
      betsNo: new FormControl(0, [Validators.required]),
      currency: new FormControl('TL', [Validators.required]),
      doubleComissionRate: new FormControl(4, [Validators.required]),
      doubleMinOdd: new FormControl(1.5, [Validators.required]),
      email: new FormControl('Default@mail.com', [Validators.required]),
      isActive: new FormControl(true, [Validators.required]),
      isMasterAccount: new FormControl(false, [Validators.required]),
      isSuspended: new FormControl(false, [Validators.required]),
      comissionRate: new FormControl(null, [Validators.required]),
      minimumOdd: new FormControl(null, [Validators.required]),
      maxUserLimit: new FormControl(null, [Validators.required]),
      mobile: new FormControl('05', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      parentId: new FormControl(
        this.userIsPromoter ? this.dataService.currentUser.id : null
      ),
      parentName: new FormControl(
        this.userIsPromoter ? this.dataService.currentUser.name : null
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          new RegExp('^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
        ),
      ]),
      role: new FormControl('Shop'),
      singleComissionRate: new FormControl(4, [Validators.required]),
      singleMinOdd: new FormControl(1.5, [Validators.required]),
      symbol: new FormControl('₺', [Validators.required]),
      totalStack: new FormControl(0, [Validators.required]),
      tripleComissionRate: new FormControl(4, [Validators.required]),
      tripleMinOdd: new FormControl(1.5, [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  usernameAvailable() {
    if (this.addForm.get('username').value === '') {
      this.usernameAvi = '';
    } else {
      this.dataService
        .usernameAvailable(this.addForm.get('username').value)
        .subscribe((response) => {
          if (!response.body) {
            this.usernameAvi = 'This username is not available';
            this.addForm.get('username').setErrors({ incorrect: true });
          }
        });
    }
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
    this.editingUser.email = obj.email;
    this.editingUser.mobile = String(obj.mobile);
    this.editingUser.isActive = obj.isActive;
    this.editingUser.maxUserLimit = obj.maxUserLimit;
    this.editingUser.localComissionSetting = obj.localComissionSetting;
    this.editingUser.betsNo = obj.betsNo;
    this.editingUser.totalStack = obj.totalStack;
    this.editingUser.singleComissionRate = obj.singleComissionRate;
    this.editingUser.singleMinOdd = obj.singleMinOdd;
    this.editingUser.doubleComissionRate = obj.doubleComissionRate;
    this.editingUser.doubleMinOdd = obj.doubleMinOdd;
    this.editingUser.tripleComissionRate = obj.tripleComissionRate;
    this.editingUser.tripleMinOdd = obj.tripleMinOdd;

    this.dataService.submitChangesForUser(this.editingUser).subscribe(
      (response) => {
        this.LoadUsers();
        this.message.create('success', `User updated successfully`);
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
      name: new FormControl(this.editingUser.name, [Validators.required]),
      email: new FormControl(this.editingUser.email, [Validators.required]),
      mobile: new FormControl(this.editingUser.mobile, [Validators.required]),
      maxUserLimit: new FormControl(this.editingUser.maxUserLimit, [
        Validators.required,
      ]),
      isActive: new FormControl(this.editingUser.isActive),
      localComissionSetting: new FormControl(
        this.editingUser.localComissionSetting
      ),
      betsNo: new FormControl(this.editingUser.betsNo, [Validators.required]),
      totalStack: new FormControl(this.editingUser.totalStack, [
        Validators.required,
      ]),
      singleComissionRate: new FormControl(
        this.editingUser.singleComissionRate,
        [Validators.required]
      ),
      singleMinOdd: new FormControl(this.editingUser.singleMinOdd, [
        Validators.required,
      ]),
      doubleComissionRate: new FormControl(
        this.editingUser.doubleComissionRate,
        [Validators.required]
      ),
      doubleMinOdd: new FormControl(this.editingUser.doubleMinOdd, [
        Validators.required,
      ]),

      tripleComissionRate: new FormControl(
        this.editingUser.tripleComissionRate,
        [Validators.required]
      ),
      tripleMinOdd: new FormControl(this.editingUser.tripleMinOdd, [
        Validators.required,
      ]),
    });
  }

  // CHANGE PASSWORD FORM

  showPasswordModal(item: any): void {
    this.editingUser = item;
    this.initializePasswordForm();
    this.isPasswordVisible = true;
  }

  submitPasswordForm() {
    this.isOkLoading = true;

    this.dataService
      .submitNewPasswordForUser(
        this.editingUser.id,
        this.passwordForm.get('password').value
      )
      .subscribe(
        (response) => {
          this.message.create('success', `Password updated successfully`);
          this.isPasswordVisible = false;
          this.isOkLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.isOkLoading = false;
        }
      );
  }

  initializePasswordForm() {
    this.passwordForm = this.fb.group({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          new RegExp('^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
        ),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.pattern(
          new RegExp('^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
        ),
      ]),
    });
  }

  // DEPOSIT FORM
  showDepositModal(item: any): void {
    this.editingUser = item;
    this.initializeDepositForm();
    this.isDepositVisible = true;
  }

  initializeDepositForm() {
    this.depositForm = this.fb.group({
      amount: new FormControl('', [Validators.required]),
      costAmount: new FormControl(0, [Validators.required]),
      costPercentage: new FormControl(0, [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      isDeposite: new FormControl(true, [Validators.required]),
      parentId: new FormControl(this.editingUser.parentId, [
        Validators.required,
      ]),
      paymentType: new FormControl('Cash', [Validators.required]),
      refrence: new FormControl('', [Validators.required]),
      userId: new FormControl(this.editingUser.id, [Validators.required]),
    });
  }

  submitDepositForm() {
    this.isOkLoading = true;
    let obj = this.depositForm.getRawValue();
    this.dataService.submitDepositForm(obj).subscribe(
      (response) => {
        this.LoadUsers();
        if (obj.paymentType === 'Cash') {
          this.message.create('success', `Cash deposit successful`);
        } else {
          this.message.create('success', `Credit deposit successful`);
        }
        this.isOkLoading = false;
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
        this.isOkLoading = false;
      }
    );
  }

  // WITHDRAW FORM
  showWithdrawModal(item: any): void {
    this.editingUser = item;
    this.initializeWithdrawForm();
    this.isWithdrawVisible = true;
  }

  initializeWithdrawForm() {
    this.withdrawForm = this.fb.group({
      amount: new FormControl('', [Validators.required]),
      costAmount: new FormControl(0, [Validators.required]),
      costPercentage: new FormControl(0, [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      isDeposite: new FormControl(false, [Validators.required]),
      parentId: new FormControl(this.editingUser.parentId, [
        Validators.required,
      ]),
      paymentType: new FormControl('Cash', [Validators.required]),
      refrence: new FormControl('', [Validators.required]),
      userId: new FormControl(this.editingUser.id, [Validators.required]),
    });
  }

  submitWithdrawForm() {
    this.isOkLoading = true;
    let obj = this.withdrawForm.getRawValue();
    this.dataService.submitDepositForm(obj).subscribe(
      (response) => {
        this.LoadUsers();
        if (obj.paymentType === 'Cash') {
          this.message.create('success', `Cash withdraw successful`);
        } else {
          this.message.create('success', `Credit withdraw successful`);
        }
        this.isOkLoading = false;
      },
      (error) => {
        this.message.create('error', `Insufficient credit`);
        this.isOkLoading = false;
      }
    );
  }

  // HISTORY FORM
  showHistoryModal(item: any): void {
    this.editingUser = item;
    this.getUserTransactions();
  }

  getUserTransactions() {
    this.userTransactionsLoading = true;
    this.dataService
      .getTransactionForUser(
        this.dataService.convertDateTimeToIso(this.userTransactionsDate[0]),
        this.dataService.convertDateTimeToIso(this.userTransactionsDate[1]),
        this.editingUser.id,
        1,
        10000,
        this.userTransactionsType
      )
      .subscribe(
        (resp) => {
          this.userTransactionsData = resp.body.transactions;
          this.isHistoryVisible = true;
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Insufficient credit`);
          this.userTransactionsLoading = false;
        }
      );
  }

  // BALANCE FORM
  showBalanceModal(item: any): void {
    this.editingUser = item;
    this.initializeBalanceForm();
  }

  initializeBalanceForm() {
    this.dataService
      .getBalanceForUser(this.editingUser.id)
      .subscribe((resp) => {
        console.log(resp);
        this.balanceModel = resp;
        this.isBalanceVisible = true;
      });
  }

  submitBalanceForm() {
    this.isOkLoading = true;

    this.dataService.collectBalanceForUser(this.balanceModel.userId).subscribe(
      (resp) => {
        this.initializeBalanceForm();
        this.message.create('success', `Payment successful`);
        this.isOkLoading = false;
      },
      (err) => {
        this.message.create('error', `Something went wrong`);
        this.isOkLoading = false;
      }
    );
  }
}
