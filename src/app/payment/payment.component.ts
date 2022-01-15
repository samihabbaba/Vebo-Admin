import { Component, OnInit } from '@angular/core';
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

interface DataItem {
  id: any;
  name: any;
  balance: any;
  depositPercent: any;
  withdrawPercent: any;
  isActive: any;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  expandSet = new Set<number>();

  isOkLoading: boolean = false;
  // Modal Variables
  isAddVisible: boolean = false;
  isDetailVisible: boolean = false;
  isDepositVisible: boolean = false;
  isWithdrawVisible: boolean = false;
  isHistoryVisible: boolean = false;

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

  dataSource = [];

  orderColumn = [
    {
      title: this.translate.instant('Id'),
      compare: (a: DataItem, b: DataItem) => a.id.localeCompare(b.id),
    },
    {
      title: this.translate.instant('Name'),
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    },
    {
      title: this.translate.instant('Balance'),
      compare: (a: DataItem, b: DataItem) => a.balance.localeCompare(b.balance),
    },
    {
      title: this.translate.instant('Deposit Percent'),
      compare: (a: DataItem, b: DataItem) =>
        a.depositPercent.localeCompare(b.depositPercent),
    },

    {
      title: this.translate.instant('Withdraw Percent'),
      compare: (a: DataItem, b: DataItem) =>
        a.withdrawPercent.localeCompare(b.withdrawPercent),
    },
    {
      title: this.translate.instant('Active'),
      compare: (a: DataItem, b: DataItem) => a.isActive - b.isActive,
    },
    {
      title: '',
    },
  ];

  orderColumnTransactions = [
    {
      title: this.translate.instant('Staff'),
      compare: (a: any, b: any) => a.staff.localeCompare(b.staff),
    },
    {
      title: this.translate.instant('Amount'),
      compare: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: this.translate.instant('Type'),
      compare: (a: any, b: any) => a.isDeposit - b.isDeposit,
    },
    {
      title: this.translate.instant('Previous'),
      compare: (a: any, b: any) => a.prevBalance - b.prevBalance,
    },

    {
      title: this.translate.instant('Current'),
      compare: (a: any, b: any) => a.currentBalance - b.currentBalance,
    },

    {
      title: this.translate.instant('Reference'),
      compare: (a: any, b: any) => a.reference.localeCompare(b.reference),
    },
    {
      title: this.translate.instant('Date'),
      compare: (a: any, b: any) => a.date.localeCompare(b.date),
    },
    // {
    //   title: 'Time',
    //   compare: (a: any, b: any) => a.time.localeCompare(b.time),
    // },
  ];

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    public dataService: DataService,
    private fb: FormBuilder,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.LoadUsers();
  }

  LoadUsers() {
    this.isSearchLoading = true;
    this.dataService.getPayments().subscribe(
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

  suspendConfirm(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to activate the payment ${item.name}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isDeleted = false;
        this.editingUser.isActive = true;
        this.dataService.updatePayment(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Payment activated successfully`);
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
      nzTitle: `Do you Want to deactivated the payment ${item.name}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.editingUser.isDeleted = false;
        this.editingUser.isActive = false;
        this.dataService.updatePayment(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Payment deactivated successfully`);
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
      nzTitle: `Are you sure delete the payment ${item.name}?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.editingUser.isActive = false;
        this.editingUser.isDeleted = true;
        this.dataService.updatePayment(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `Payment deleted successfully`);
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
    const obj = this.addForm.getRawValue();
    this.dataService.AddPayment(obj).subscribe(
      (response) => {
        this.LoadUsers();
        this.message.create('success', `Payment added successfully`);
        this.isAddVisible = false;
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
      withdrawPercent: new FormControl('', [Validators.required]),
      depositPercent: new FormControl('', [Validators.required]),
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
    this.editingUser.withdrawPercent = obj.withdrawPercent;
    this.editingUser.depositPercent = obj.depositPercent;
    this.editingUser.isDeleted = false;

    this.dataService.updatePayment(this.editingUser).subscribe(
      (response) => {
        this.LoadUsers();
        this.message.create('success', `Payment updated successfully`);
        this.isDetailVisible = false;
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

  initializeDetailForm() {
    this.detailForm = this.fb.group({
      withdrawPercent: new FormControl(this.editingUser.withdrawPercent, [
        Validators.required,
      ]),
      depositPercent: new FormControl(this.editingUser.depositPercent, [
        Validators.required,
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
      isDeposit: new FormControl(true, [Validators.required]),
      paymentId: new FormControl(this.editingUser.id, [Validators.required]),
      reference: new FormControl('', [Validators.required]),
      staffId: new FormControl(this.dataService.currentUser.id, [
        Validators.required,
      ]),
    });
  }

  submitDepositForm() {
    this.isOkLoading = true;
    let obj = this.depositForm.getRawValue();
    this.dataService.submitPaymentDepositForm(obj).subscribe(
      (response) => {
        this.LoadUsers();
        this.message.create('success', `Deposit successful`);
        this.isDepositVisible = false;
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

  // WITHDRAW FORM
  showWithdrawModal(item: any): void {
    this.editingUser = item;
    this.initializeWithdrawForm();
    this.isWithdrawVisible = true;
  }

  initializeWithdrawForm() {
    this.withdrawForm = this.fb.group({
      amount: new FormControl('', [Validators.required]),
      isDeposit: new FormControl(false, [Validators.required]),
      paymentId: new FormControl(this.editingUser.id, [Validators.required]),
      reference: new FormControl('', [Validators.required]),
      staffId: new FormControl(this.dataService.currentUser.id, [
        Validators.required,
      ]),
    });
  }

  submitWithdrawForm() {
    this.isOkLoading = true;
    let obj = this.withdrawForm.getRawValue();
    this.dataService.submitPaymentDepositForm(obj).subscribe(
      (response) => {
        this.LoadUsers();
        this.message.create('success', `Withdraw successful`);
        this.isWithdrawVisible = false;
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
    this.isHistoryVisible = true;
    this.getUserTransactions();
  }

  getUserTransactions() {
    this.userTransactionsLoading = true;
    this.dataService
      .getPaymentsTransactionHistory(
        this.userTransactionsDate[0].toISOString().slice(0, -14),
        this.userTransactionsDate[1].toISOString().slice(0, -14),
        this.editingUser.id,
        this.userTransactionsType
      )
      .subscribe(
        (resp) => {
          this.userTransactionsData = resp.body;
          console.log(this.userTransactionsData);
          this.isHistoryVisible = true;
          this.userTransactionsLoading = false;
        },
        (error) => {
          this.message.create('error', `Something went wrong`);
          this.userTransactionsLoading = false;
        }
      );
  }
}
