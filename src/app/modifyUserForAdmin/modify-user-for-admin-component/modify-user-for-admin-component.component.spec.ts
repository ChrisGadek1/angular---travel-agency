import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserForAdminComponentComponent } from './modify-user-for-admin-component.component';

describe('ModifyUserForAdminComponentComponent', () => {
  let component: ModifyUserForAdminComponentComponent;
  let fixture: ComponentFixture<ModifyUserForAdminComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyUserForAdminComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyUserForAdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
