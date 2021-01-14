import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelTripsComponent } from './user-panel-trips.component';

describe('UserPanelTripsComponent', () => {
  let component: UserPanelTripsComponent;
  let fixture: ComponentFixture<UserPanelTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
