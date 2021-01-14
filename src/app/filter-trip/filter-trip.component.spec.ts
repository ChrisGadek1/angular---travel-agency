import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTripComponent } from './filter-trip.component';

describe('FilterTripComponent', () => {
  let component: FilterTripComponent;
  let fixture: ComponentFixture<FilterTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
