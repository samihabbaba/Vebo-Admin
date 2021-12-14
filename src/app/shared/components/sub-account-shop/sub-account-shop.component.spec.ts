import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAccountShopComponent } from './sub-account-shop.component';

describe('SubAccountShopComponent', () => {
  let component: SubAccountShopComponent;
  let fixture: ComponentFixture<SubAccountShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAccountShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAccountShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
