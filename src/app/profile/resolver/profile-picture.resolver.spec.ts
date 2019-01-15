import { TestBed } from '@angular/core/testing';

import { ProfilePictureResolver } from './profile-picture.resolver';

describe('ProfilePictureResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilePictureResolver = TestBed.get(ProfilePictureResolver);
    expect(service).toBeTruthy();
  });
});
