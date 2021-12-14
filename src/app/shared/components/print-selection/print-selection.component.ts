import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-print-selection',
  templateUrl: './print-selection.component.html',
  styleUrls: ['./print-selection.component.css'],
})
export class PrintSelectionComponent implements OnInit {
  private eventsSubscription: Subscription;

  @Input() events: Observable<number>;

  constructor(
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((resp) => {
      this.printOrder(resp);
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  modalToPrint: any = {};

  async printOrder(id) {
    let res = await this.getBetById(id);
    if (!res) {
      return;
    }
    // this.cdr.detectChanges();
    // this.cdr.markForCheck();
    let btn = document.getElementById('printBtn');
    btn.click();
  }

  async getBetById(id) {
    return new Promise((resolve, reject) => {
      this.dataService.GetBetById(id).subscribe(
        (resp) => {
          this.modalToPrint = resp;
          // this.cdr.detectChanges();
          // this.cdr.markForCheck();

          resolve(true);
        },
        (error) => {
          // resolve(undefined);
          reject(false);
          // reject(false);
        }
      );
    });
  }

  returnBetType(type) {
    if (type === 1) {
      return 'Single';
    }

    if (type === 2) {
      return 'Multiple';
    }

    if (type === 3) {
      return 'System';
    }

    return 'Unknown';
  }

  displayFormattedNumber(num: number) {
    if (num == null || num == undefined) {
      return 0;
    }
    return this.formatNumber(num.toFixed(2));
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  returnSelectionStatus(s) {
    if (s.isVoid) {
      return 'Void';
    }

    if (s.isPending) {
      return 'Pending';
    }
    if (s.isWin) {
      return 'Win';
    }
    return 'Lose';
  }

  displayScore(s) {
    if (s === null) {
      return '-';
    }
    return s;
  }
}
