import { TestBed } from '@angular/core/testing';

import { CategoriasasignacionpercService } from './categoriasasignacionperc.service';

describe('CategoriasasignacionpercService', () => {
  let service: CategoriasasignacionpercService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasasignacionpercService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
