import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBetsComponent } from './user-bets.component';

describe('UserBetsComponent', () => {
  let component: UserBetsComponent;
  let fixture: ComponentFixture<UserBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
