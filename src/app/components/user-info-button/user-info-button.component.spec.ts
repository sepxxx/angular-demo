import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoButtonComponent } from './user-info-button.component';

describe('UserInfoButtonComponent', () => {
  let component: UserInfoButtonComponent;
  let fixture: ComponentFixture<UserInfoButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoButtonComponent]
    });
    fixture = TestBed.createComponent(UserInfoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
