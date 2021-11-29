import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerModeComponent } from './player-mode.component';

describe('PlayerModeComponent', () => {
  let component: PlayerModeComponent;
  let fixture: ComponentFixture<PlayerModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
