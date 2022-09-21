import { TestBed } from '@angular/core/testing';

import { CattiposdevolucionesService } from './cattiposdevoluciones.service';

describe('CattiposdevolucionesService', () => {
  let service: CattiposdevolucionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattiposdevolucionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
