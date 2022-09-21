import { TestBed } from '@angular/core/testing';

import { ReduccionesService } from './reducciones.service';

describe('ReduccionesService', () => {
  let service: ReduccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReduccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
