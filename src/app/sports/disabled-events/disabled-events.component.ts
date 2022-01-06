import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
@Component({
  selector: 'app-disabled-events',
  templateUrl: './disabled-events.component.html',
  styleUrls: ['./disabled-events.component.css'],
})
export class DisabledEventsComponent implements OnInit {
  isOkLoading: boolean = false;
  // Modal Variables
  isDetailVisible: boolean = false;

  isSearchLoading: boolean = false;

  detailForm: FormGroup;
  editingUser: any;

  subs$: Subscription;

  sports = [];

  orderColumn = [
    {
      title: 'Home Team',
      compare: (a: any, b: any) => a.homeTeam.localeCompare(b.homeTeam),
    },
    {
      title: 'Away Team',
      compare: (a: any, b: any) => a.awayTeam.localeCompare(b.awayTeam),
    },
    {
      title: 'Date',
      compare: (a: any, b: any) => a.date - b.date,
    },
    {
      title: 'Enable',
    },
  ];

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private dataService: DataService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this.LoadUsers();
    this.subs$ = this.dataService.reloadEvents.subscribe((resp) => {
      if (resp) {
        this.LoadUsers();
      }
    });
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }

  LoadUsers() {
    this.dataService.getDisbaledMatches().subscribe(
      (response) => {
        this.sports = response.body;
        console.log(this.sports);
      },
      (error) => {
        this.message.create('error', `Something went wrong`);
      }
    );
  }

  enableMatch(item: any): void {
    this.editingUser = item;
    this.modalService.confirm({
      nzTitle: `Do you Want to enable the match ${item.homeTeam} - ${item.awayTeam}?`,
      nzOkText: 'Yes',
      nzOnOk: () => {
        this.dataService.enableMatch(this.editingUser).subscribe(
          (response) => {
            // this.LoadUsers();
            this.dataService.reloadEvents.next(true);
            this.message.create('success', `Match enabled successfully`);
          },
          (error) => {
            this.message.create('error', `Something went wrong`);
          }
        );
      },
    });
  }
}
