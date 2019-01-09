import { TestBed } from '@angular/core/testing';

import { QuillEditorService } from './quill-editor.service';

describe('QuillEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuillEditorService = TestBed.get(QuillEditorService);
    expect(service).toBeTruthy();
  });
});
