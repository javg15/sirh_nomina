import { TestBed } from '@angular/core/testing';

import { PercepcionescapturaService } from './percepcionescaptura.service';

describe('PercepcionescapturaService', () => {
  let service: PercepcionescapturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PercepcionescapturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
