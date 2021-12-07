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
  email: any;
  mobile: any;
  isActive: any;
  isSuspended: any;
}

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MasterComponent implements OnInit {
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
      title: 'Email',
      compare: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
    },
    {
      title: 'Mobile',
      compare: (a: DataItem, b: DataItem) => a.mobile.localeCompare(b.mobile),
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

  constructor(
    private tableSvc: TableService,
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
    this.dataService.getUsers('Master', this.searchInput).subscribe(
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

  // ADD FORM

  showAddModal(): void {
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
      isSuspended: new FormControl(false),
      parentId: new FormControl(this.dataService.currentUser.id),
      parentName: new FormControl(this.dataService.currentUser.name),
      currency: new FormControl('TL'),
      symbol: new FormControl('₺'),
      role: new FormControl('Master'),
      isMasterAccount: new FormControl(true),
      email: new FormControl('Default@mail.com', [Validators.required]),
      mobile: new FormControl('05', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          new RegExp('^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
        ),
      ]),
      isActive: new FormControl(true),
      isMaster: new FormControl(false),
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
    this.editingUser.isMaster = obj.isMaster;
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
      isActive: new FormControl(this.editingUser.isActive),
      isMaster: new FormControl(this.editingUser.isMaster),
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
}
