import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryBetComponent } from './transaction-history-bet.component';

describe('TransactionHistoryBetComponent', () => {
  let component: TransactionHistoryBetComponent;
  let fixture: ComponentFixture<TransactionHistoryBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryBetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
