import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetOfficeComponent } from './bet-office.component';

describe('BetOfficeComponent', () => {
  let component: BetOfficeComponent;
  let fixture: ComponentFixture<BetOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
