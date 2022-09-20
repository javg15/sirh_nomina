import { TestBed } from '@angular/core/testing';

import { CattiposadeudosService } from './cattiposadeudos.service';

describe('CattiposadeudosService', () => {
  let service: CattiposadeudosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattiposadeudosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
