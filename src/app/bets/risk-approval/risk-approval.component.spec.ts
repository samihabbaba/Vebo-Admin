import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskApprovalComponent } from './risk-approval.component';

describe('RiskApprovalComponent', () => {
  let component: RiskApprovalComponent;
  let fixture: ComponentFixture<RiskApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
