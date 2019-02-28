import { TestBed } from '@angular/core/testing';

import { EmailVerificationResolverService } from './email-verification-resolver.service';

describe('EmailVerificationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailVerificationResolverService = TestBed.get(EmailVerificationResolverService);
    expect(service).toBeTruthy();
  });
});
