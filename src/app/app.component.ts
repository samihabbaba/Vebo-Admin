import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RiskApprovalNotificationComponent } from './shared/components/risk-approval-notification/risk-approval-notification.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('template') template: TemplateRef<any>


@ViewChild('notification') comp: RiskApprovalNotificationComponent
constructor( private notification: NzNotificationService) {

}


ngOnInit() {
this.notification.template(this.template)
}
}
