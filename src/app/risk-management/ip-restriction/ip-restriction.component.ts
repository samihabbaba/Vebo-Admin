import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataService } from 'src/app/shared/services/data.service';
import { TableService } from 'src/app/shared/services/table.service';

interface DataItem {
  ip: any;
}

@Component({
  selector: 'app-ip-restriction',
  templateUrl: './ip-restriction.component.html',
  styleUrls: ['./ip-restriction.component.css'],
})
export class IpRestrictionComponent implements OnInit {
  isOkLoading: boolean = false;
  // Modal Variables
  isAddVisible: boolean = false;
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  addForm: FormGroup;
  usernameAvi: any;

  detailForm: FormGroup;
  editingUser: any;

  ipToAdd = '';

  searchInput: any = '';

  dataSource = [];
  dataSourceCopy = [];

  orderColumn = [
    {
      title: 'Id',
    },

    {
      title: 'Delete',
    },
  ];

  constructor(
    private tableSvc: TableService,
    public authService: AuthenticationService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.debounceSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.search();
      });
  }

  ngOnInit() {
    this.LoadUsers();
  }

  LoadUsers() {
    this.isSearchLoading = true;
    this.dataService.getIPsList().subscribe(
      (response) => {
        this.dataSource = response.body;
        this.dataSourceCopy = response.body;
        this.isSearchLoading = false;
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
        this.isSearchLoading = false;
      }
    );
  }

  debounceSubject = new Subject<any>();

  search(event?: any): void {
    this.isSearchLoading = true;
    this.dataSource = this.dataSourceCopy.filter((x) =>
      x.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    this.isSearchLoading = false;
  }

  showDeleteConfirm(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Are you sure delete the IP ${item}?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.dataService.deleteIP(this.editingUser).subscribe(
          (response) => {
            this.LoadUsers();
            this.message.create('success', `IP deleted successfully`);
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
    this.ipToAdd = '';
    this.isAddVisible = true;
  }

  submitAddForm() {
    this.isOkLoading = true;
    this.dataService.addNewIP(this.ipToAdd).subscribe(
      (response) => {
        if (response.status == 201) {
          this.LoadUsers();
          this.message.create('success', `IP added successfully`);

          this.isAddVisible = false;
        }
        this.isOkLoading = false;
      },
      (error) => {
        this.message.create('error', `An error occured.`);
        this.isOkLoading = false;
      }
    );
  }
}
