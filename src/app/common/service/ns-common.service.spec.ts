import { TestBed } from '@angular/core/testing';

import { NsCommonService } from './ns-common.service';

describe('NsCommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NsCommonService = TestBed.get(NsCommonService);
    expect(service).toBeTruthy();
  });
});
