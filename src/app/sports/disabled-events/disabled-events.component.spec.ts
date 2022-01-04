import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledEventsComponent } from './disabled-events.component';

describe('DisabledEventsComponent', () => {
  let component: DisabledEventsComponent;
  let fixture: ComponentFixture<DisabledEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabledEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
