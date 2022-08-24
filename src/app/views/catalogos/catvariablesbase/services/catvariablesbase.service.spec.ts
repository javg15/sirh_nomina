import { TestBed } from '@angular/core/testing';

import { CatvariablesbaseService } from './catvariablesbase.service';

describe('CatvariablesbaseService', () => {
  let service: CatvariablesbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatvariablesbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
