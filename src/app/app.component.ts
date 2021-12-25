import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from './shared/services/authentication.service';
import { SignalRService } from './shared/services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private notification: NzNotificationService,
    private signalService: SignalRService,
    private authService: AuthenticationService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.authService.setCurrentUser();
    this.signalService.pushNotification.subscribe((value) => {
      if (value) {
        this.notification
          .create('info', 'Risk Approval', 'New Bet is Awaiting Approval')
          .onClick.subscribe(() => {
            this.notification.remove();
            this.zone.run(() => {
              this.router.navigateByUrl('bets/risk-approval');
            });
          });
      }
    });
  }
}
