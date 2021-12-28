import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskPlanBetOfficeComponent } from './risk-plan-bet-office.component';

describe('RiskPlanBetOfficeComponent', () => {
  let component: RiskPlanBetOfficeComponent;
  let fixture: ComponentFixture<RiskPlanBetOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskPlanBetOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskPlanBetOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
