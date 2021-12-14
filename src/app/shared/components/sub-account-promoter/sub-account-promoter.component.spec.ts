import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAccountPromoterComponent } from './sub-account-promoter.component';

describe('SubAccountPromoterComponent', () => {
  let component: SubAccountPromoterComponent;
  let fixture: ComponentFixture<SubAccountPromoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAccountPromoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAccountPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
