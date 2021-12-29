import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryInternalComponent } from './transaction-history-internal.component';

describe('TransactionHistoryInternalComponent', () => {
  let component: TransactionHistoryInternalComponent;
  let fixture: ComponentFixture<TransactionHistoryInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryInternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
