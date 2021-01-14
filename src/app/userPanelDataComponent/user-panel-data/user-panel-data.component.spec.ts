import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelDataComponent } from './user-panel-data.component';

describe('UserPanelDataComponent', () => {
  let component: UserPanelDataComponent;
  let fixture: ComponentFixture<UserPanelDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
