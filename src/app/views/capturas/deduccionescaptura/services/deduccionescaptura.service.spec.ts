import { TestBed } from '@angular/core/testing';

import { DeduccionescapturaService } from './deduccionescaptura.service';

describe('DeduccionescapturaService', () => {
  let service: DeduccionescapturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeduccionescapturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
