import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableSportsComponent } from './available-sports.component';

describe('AvailableSportsComponent', () => {
  let component: AvailableSportsComponent;
  let fixture: ComponentFixture<AvailableSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableSportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
