import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponentUserComponent } from './welcome-component-user.component';

describe('WelcomeComponentUserComponent', () => {
  let component: WelcomeComponentUserComponent;
  let fixture: ComponentFixture<WelcomeComponentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponentUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
