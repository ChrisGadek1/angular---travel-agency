import { TestBed } from '@angular/core/testing';

import { ValidateRegisterService } from './validate-register.service';

describe('ValidateRegisterService', () => {
  let service: ValidateRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
