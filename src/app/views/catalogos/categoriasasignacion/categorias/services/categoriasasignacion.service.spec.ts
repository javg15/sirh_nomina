import { TestBed } from '@angular/core/testing';

import { CategoriasasignacionService } from './categoriasasignacion.service';

describe('CategoriasasignacionService', () => {
  let service: CategoriasasignacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasasignacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
