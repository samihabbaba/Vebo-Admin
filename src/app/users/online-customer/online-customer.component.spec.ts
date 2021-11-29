import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineCustomerComponent } from './online-customer.component';

describe('OnlineCustomerComponent', () => {
  let component: OnlineCustomerComponent;
  let fixture: ComponentFixture<OnlineCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
