import { Injectable, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
// import * as signalR from "@aspnet/signalr";
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public behaviorSubject = new BehaviorSubject(null);
  public riskApproveIsOpen = false;
  pushNotification =  new BehaviorSubject(false);


  constructor(
    @Inject(Injector) private injector: Injector,
    private router: Router,
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

    // const msg = this.translate.instant('New Bet is Awaiting Approval');
    this.pushNotification.next(true)

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
    this.behaviorSubject.next({ status: 'new', bet: JSON.parse(bet) });
  }
}
