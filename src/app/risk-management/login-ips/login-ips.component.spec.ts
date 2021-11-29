import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginIpsComponent } from './login-ips.component';

describe('LoginIpsComponent', () => {
  let component: LoginIpsComponent;
  let fixture: ComponentFixture<LoginIpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginIpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginIpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
