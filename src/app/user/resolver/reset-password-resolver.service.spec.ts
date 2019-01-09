import { TestBed } from '@angular/core/testing';
import { ResetPasswordResolverService } from './reset-password-resolver.service';

describe('ResetPasswordResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetPasswordResolverService = TestBed.get(ResetPasswordResolverService);
    expect(service).toBeTruthy();
  });
});
