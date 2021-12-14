import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBetsActivityComponent } from './user-bets-activity.component';

describe('UserBetsActivityComponent', () => {
  let component: UserBetsActivityComponent;
  let fixture: ComponentFixture<UserBetsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBetsActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBetsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
