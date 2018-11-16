import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivateNoteEditGuard } from './can-deactivate-note-edit.guard';

describe('CanDeactivateNoteEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateNoteEditGuard]
    });
  });

  it('should ...', inject([CanDeactivateNoteEditGuard], (guard: CanDeactivateNoteEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
