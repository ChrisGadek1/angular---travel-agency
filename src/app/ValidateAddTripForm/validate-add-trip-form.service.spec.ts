import { TestBed } from '@angular/core/testing';

import { ValidateAddTripFormService } from './validate-add-trip-form.service';

describe('ValidateAddTripFormService', () => {
  let service: ValidateAddTripFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateAddTripFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
