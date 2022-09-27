import { TestBed } from '@angular/core/testing';

import { CatfondospresupuestalesService } from './catfondospresupuestales.service';

describe('CatfondospresupuestalesService', () => {
  let service: CatfondospresupuestalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatfondospresupuestalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
