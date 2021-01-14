import { TestBed } from '@angular/core/testing';

import { AddToBasketService } from './add-to-basket.service';

describe('AddToBasketService', () => {
  let service: AddToBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
