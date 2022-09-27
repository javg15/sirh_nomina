import { TestBed } from '@angular/core/testing';

import { CatrecibostiposService } from './catrecibostipos.service';

describe('CatrecibostiposService', () => {
  let service: CatrecibostiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatrecibostiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
