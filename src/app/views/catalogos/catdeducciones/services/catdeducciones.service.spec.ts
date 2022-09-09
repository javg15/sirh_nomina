import { TestBed } from '@angular/core/testing';

import { CatdeduccionesService } from './catdeducciones.service';

describe('CatdeduccionesService', () => {
  let service: CatdeduccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatdeduccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
