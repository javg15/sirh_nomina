import { TestBed } from '@angular/core/testing';

import { CategoriasasignacionsubService } from './categoriasasignacionsub.service';

describe('CategoriasasignacionsubService', () => {
  let service: CategoriasasignacionsubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasasignacionsubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
