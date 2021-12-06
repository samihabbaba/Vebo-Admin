import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.setCurrentUser();
    this.signalService.pushNotification.subscribe((value) => {
      if (value) {
        this.notification.create(
          'info',
          'Risk Approval',
          'New Bet is Awaiting Approval'
        );
      }
    });
  }
}
