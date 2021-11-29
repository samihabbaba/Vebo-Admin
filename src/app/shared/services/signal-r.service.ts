import { Injectable, Inject, Injector, Component } from '@angular/core';
import { Router } from '@angular/router';
// import * as signalR from "@aspnet/signalr";
import * as signalR from '@microsoft/signalr';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RiskApprovalNotificationComponent } from '../components/risk-approval-notification/risk-approval-notification.component';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public behaviorSubject = new BehaviorSubject(null);
  public riskApproveIsOpen = false;


  constructor(
    @Inject(Injector) private injector: Injector,
    private router: Router,
    private translate: TranslateService,
    private notification: NzNotificationService
  ) {}
  audio = new Audio('../../../assets/voice/got-it-done.mp3');

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      // .withUrl(environment.baseUrl+"approval")
      .withUrl(`${environment.baseUrl}approval`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addNewRiskApprovalListener = () => {
    this.hubConnection.on('New', (data) => {
      this.showNew(data);
      // console.log("new");
    });
  };

  public addApprovedAndRejectedListener = () => {
    this.hubConnection.on('Rejected', (data) => {
      this.behaviorSubject.next({ status: 'new', bet: JSON.parse(data) });
    });

    this.hubConnection.on('Approved', (data) => {
      const objectToPass: any = { status: 'new', bet: JSON.parse(data) };
      this.behaviorSubject.next(objectToPass);
    });
  };

  showNew(bet) {
    // this.toastr.clear();

    const msg = this.translate.instant('New Bet is Awaiting Approval');

    // const toast = this.toastr.warning(msg);

    // let toast
    // if(this.riskApproveIsOpen){
    //    toast = this.toastr.warning(msg,'',{
    //     disableTimeOut: false,
    //     timeOut: 2500,
    //    });

    // }else{
    //    toast = this.toastr.warning(msg);
    // }

    this.audio.play();
    // toast.onTap.subscribe(() => {
    //   this.router.navigate(["bets/riskApprove"]);
    // });
    this.notification.template(RiskApprovalNotificationComponent.prototype.template);
    this.behaviorSubject.next({ status: 'new', bet: JSON.parse(bet) });
  }
}
