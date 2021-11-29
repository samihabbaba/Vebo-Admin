import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpRestrictionComponent } from './ip-restriction.component';

describe('IpRestrictionComponent', () => {
  let component: IpRestrictionComponent;
  let fixture: ComponentFixture<IpRestrictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpRestrictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
