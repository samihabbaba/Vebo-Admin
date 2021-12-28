import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskPlanOnlineCustomerComponent } from './risk-plan-online-customer.component';

describe('RiskPlanOnlineCustomerComponent', () => {
  let component: RiskPlanOnlineCustomerComponent;
  let fixture: ComponentFixture<RiskPlanOnlineCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskPlanOnlineCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskPlanOnlineCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
