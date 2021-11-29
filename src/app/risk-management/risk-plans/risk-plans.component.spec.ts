import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskPlansComponent } from './risk-plans.component';

describe('RiskPlansComponent', () => {
  let component: RiskPlansComponent;
  let fixture: ComponentFixture<RiskPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
