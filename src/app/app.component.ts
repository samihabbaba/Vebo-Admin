import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { locale as enLang } from './i18n/vocabs/en';
import { locale as trLang } from './i18n/vocabs/tr';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { TranslationService } from './i18n/translation.service';
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
    private zone: NgZone,
    private translationService: TranslationService
  ) {
    // register translations
    this.translationService.loadTranslations(enLang, trLang);
  }

  ngOnInit() {
    this.authService.setCurrentUser();
    this.signalService.pushNotification.subscribe((value) => {
      if (value) {
        this.notification
          .create('info', 'Risk Approval', 'New Bet is Awaiting Approval', {
            nzDuration: 120,
          })
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
