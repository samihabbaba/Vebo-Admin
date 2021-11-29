import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCalculationComponent } from './risk-calculation.component';

describe('RiskCalculationComponent', () => {
  let component: RiskCalculationComponent;
  let fixture: ComponentFixture<RiskCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
