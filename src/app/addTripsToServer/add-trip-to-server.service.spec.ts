import { TestBed } from '@angular/core/testing';

import { AddTripToServerService } from './add-trip-to-server.service';

describe('AddTripToServerService', () => {
  let service: AddTripToServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTripToServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
