import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSelectionComponent } from './print-selection.component';

describe('PrintSelectionComponent', () => {
  let component: PrintSelectionComponent;
  let fixture: ComponentFixture<PrintSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
