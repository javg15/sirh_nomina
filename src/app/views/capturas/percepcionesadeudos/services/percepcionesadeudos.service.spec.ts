import { TestBed } from '@angular/core/testing';

import { PercepcionesadeudosService } from './percepcionesadeudos.service';

describe('PercepcionesadeudosService', () => {
  let service: PercepcionesadeudosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PercepcionesadeudosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
