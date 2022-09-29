import { TestBed } from '@angular/core/testing';

import { CompensacionesService } from './compensaciones.service';

describe('CompensacionesService', () => {
  let service: CompensacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompensacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
