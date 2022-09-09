import { TestBed } from '@angular/core/testing';

import { CategoriasasignacionpercsubService } from './categoriasasignacionpercsub.service';

describe('CategoriasasignacionpercsubService', () => {
  let service: CategoriasasignacionpercsubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasasignacionpercsubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
