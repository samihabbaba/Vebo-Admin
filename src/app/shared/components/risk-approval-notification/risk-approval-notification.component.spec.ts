import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskApprovalNotificationComponent } from './risk-approval-notification.component';

describe('RiskApprovalNotificationComponent', () => {
  let component: RiskApprovalNotificationComponent;
  let fixture: ComponentFixture<RiskApprovalNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskApprovalNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskApprovalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
