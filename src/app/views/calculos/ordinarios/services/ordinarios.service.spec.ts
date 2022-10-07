import { TestBed } from '@angular/core/testing';

import { OrdinariosService } from './ordinarios.service';

describe('OrdinariosService', () => {
  let service: OrdinariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdinariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
