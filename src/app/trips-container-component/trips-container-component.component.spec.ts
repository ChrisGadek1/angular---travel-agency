import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsContainerComponent } from './trips-container-component.component';

describe('TripsContainerComponentComponent', () => {
  let component: TripsContainerComponent;
  let fixture: ComponentFixture<TripsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
