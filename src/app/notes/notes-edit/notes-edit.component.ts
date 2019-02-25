import { QuillEditorService } from './../service/quill-editor.service';
import { NotesService } from './../service/notes.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from '../model/note.model';
import { ActivatedRoute } from '@angular/router';
import { enterAnimation } from 'src/app/common/animations/animations';

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.css'],
  animations: [
    enterAnimation
  ]
})
export class NotesEditComponent implements OnInit {

  enterAnimation: any;
  noteForm: FormGroup;
  // @Input() note: Note;
  note: Note;
  pageHeader: string;
  saveUpdateLabel: string;
  formInvalid: boolean;

  /**
   * Editor related configuration..
   */

  placeholderText: string;
  toolBar: object;
  style: object;

  constructor(private formBuilder: FormBuilder,
    private notesService: NotesService,
    private route: ActivatedRoute,
    private quillEditorService: QuillEditorService) {

    this.placeholderText = quillEditorService.placeholderText;
    this.toolBar = quillEditorService.toolBar;
    this.style = quillEditorService.style;
  }

  ngOnInit() {

    this.pageHeader = 'Add New Note';
    this.saveUpdateLabel = 'Save';
    let noteTitleText = '';
    let noteContentText = '';

    this.note = this.route.snapshot.data.note;

    if (this.note) {
      this.pageHeader = 'Edit Note';
      this.saveUpdateLabel = 'Update';
      noteTitleText = this.note.note_title;
      noteContentText = this.note.note_content;
    }

    this.noteForm = this.formBuilder.group({
      note_title: [noteTitleText, [Validators.required, Validators.minLength(3)]],
      note_content: [noteContentText, [Validators.required, Validators.minLength(5)]]
    });
  }

  onNoteFormSubmit() {
    console.log(this.noteForm.value);

    if (this.noteForm.invalid) {
      this.formInvalid = true;
      return;
    } else {
      this.formInvalid = false;
    }

    if (this.note && this.note.note_id) {
      this.note.note_title = this.noteForm.value['note_title'];
      this.note.note_content = this.noteForm.value['note_content'];

      this.notesService.updateNote(this.note).subscribe(response => {
        const newNote = response.body as Note;

        this.notesService.notesMap.set(newNote.note_id, newNote);
        this.notesService.notesMapSubject.next(this.notesService.notesMap);

        this.noteForm.reset();
      }, err => {
        const errors = err.error;
        console.error(errors);
      });
      console.log('note updated successfully');
    } else {
      this.notesService.saveNote(this.noteForm.value).subscribe(response => {

        // type casting in typescript
        // https://stackoverflow.com/questions/13204759/typescript-or-javascript-type-casting

        const noteResponse = response.body as Note;
        console.log(noteResponse);

        this.notesService.notesMap.set(noteResponse.note_id, noteResponse);
        this.notesService.notesMapSubject.next(this.notesService.notesMap);

        this.noteForm.reset();
      }, err => {
        const errors = err.error;
        console.error(errors);
      });
      console.log('note saved successfully');
    }

  }
}
