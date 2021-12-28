import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusBetOfficeComponent } from './bonus-bet-office.component';

describe('BonusBetOfficeComponent', () => {
  let component: BonusBetOfficeComponent;
  let fixture: ComponentFixture<BonusBetOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusBetOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusBetOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
