import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelUsersComponent } from './user-panel-users.component';

describe('UserPanelUsersComponent', () => {
  let component: UserPanelUsersComponent;
  let fixture: ComponentFixture<UserPanelUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
