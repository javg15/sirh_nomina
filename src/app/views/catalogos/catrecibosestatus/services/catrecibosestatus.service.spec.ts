import { TestBed } from '@angular/core/testing';

import { CatrecibosestatusService } from './catrecibosestatus.service';

describe('CatrecibosestatusService', () => {
  let service: CatrecibosestatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatrecibosestatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
