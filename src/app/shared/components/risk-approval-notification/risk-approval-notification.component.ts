import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk-approval-notification',
  templateUrl: './risk-approval-notification.component.html',
  styleUrls: ['./risk-approval-notification.component.css']
})
export class RiskApprovalNotificationComponent implements OnInit {
 @ViewChild('template') template: TemplateRef<any>

  constructor(public router: Router) { }

  ngOnInit(): void {
  }



}
