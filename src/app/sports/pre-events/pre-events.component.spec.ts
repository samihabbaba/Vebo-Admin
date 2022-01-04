import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEventsComponent } from './pre-events.component';

describe('PreEventsComponent', () => {
  let component: PreEventsComponent;
  let fixture: ComponentFixture<PreEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
