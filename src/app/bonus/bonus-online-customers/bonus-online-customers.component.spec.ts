import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusOnlineCustomersComponent } from './bonus-online-customers.component';

describe('BonusOnlineCustomersComponent', () => {
  let component: BonusOnlineCustomersComponent;
  let fixture: ComponentFixture<BonusOnlineCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusOnlineCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusOnlineCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
