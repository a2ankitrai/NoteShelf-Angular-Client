import { QuillEditorService } from './../service/quill-editor.service';
import { NotesService } from './../service/notes.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from '../model/note.model';
import { ActivatedRoute, Router } from '@angular/router';
import { enterAnimation } from 'src/app/common/animations/animations';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as AppConstant from 'src/app/common/constant/app-constant';

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

  noteFormSubmitted = false;

  // Editor related configuration..
  placeholderText: string;
  toolBar: object;
  style: object;

  private alertSubject = new Subject<string>();
  alertMessage: string;
  alertType: string;

  constructor(private formBuilder: FormBuilder,
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router,
    private quillEditorService: QuillEditorService) {

    this.placeholderText = quillEditorService.placeholderText;
    this.toolBar = quillEditorService.toolBar;
    this.style = quillEditorService.style;
  }

  ngOnInit() {

    this.pageHeader = AppConstant.PAGE_HEADER_ADD_NEW_NOTE;
    this.saveUpdateLabel = AppConstant.NOTES_SAVE_BUTTON;
    let noteTitleText = '';
    let noteContentText = '';

    this.note = this.route.snapshot.data.note;

    if (this.note) {
      this.pageHeader = AppConstant.PAGE_HEADER_EDIT_NOTE;
      this.saveUpdateLabel = AppConstant.NOTES_UPDATE_BUTTON;
      noteTitleText = this.note.note_title;
      noteContentText = this.note.note_content;
    }

    this.noteForm = this.formBuilder.group({
      note_title: [noteTitleText, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      note_content: [noteContentText, [Validators.required, Validators.minLength(5)]]
    });

    this.alertSubject.subscribe((message) => this.alertMessage = message);
    this.alertSubject.pipe(debounceTime(AppConstant.ALERT_CLOSE_TIME)).subscribe(() => this.alertMessage = null);
  }

  get nf() {
    return this.noteForm.controls;
  }

  onNoteFormSubmit() {
    console.log(this.noteForm.value);

    this.noteFormSubmitted = true;

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

        // this.noteForm.reset();

        this.alertType = AppConstant.SUCCESS;
        this.alertSubject.next(AppConstant.NOTE_UPDATE_SUCCESS_MESSAGE);
        this.noteFormSubmitted = false;
      }, err => {
        const errors = err.error;
        console.error(errors);
        this.alertType = AppConstant.DANGER;
        this.alertSubject.next(AppConstant.NOTE_UPDATE_FAILURE_MESSAGE);
        this.noteFormSubmitted = false;
      });
    } else {
      this.notesService.saveNote(this.noteForm.value).subscribe(response => {

        // type casting in typescript
        // https://stackoverflow.com/questions/13204759/typescript-or-javascript-type-casting
        const noteResponse = response.body as Note;
        console.log(noteResponse);

        this.notesService.notesMap.set(noteResponse.note_id, noteResponse);
        this.notesService.notesMapSubject.next(this.notesService.notesMap);
        this.alertType = AppConstant.SUCCESS;
        this.alertSubject.next(AppConstant.NOTE_SAVE_SUCCESS_MESSAGE);
        this.noteFormSubmitted = false;
        // this.noteForm.reset();
        setTimeout(() => {
          this.editNote(noteResponse.note_id);
          this.noteForm.reset();
        }, 2000);
      }, err => {
        const errors = err.error;
        console.error(errors);
        this.alertType = AppConstant.DANGER;
        this.alertSubject.next(AppConstant.NOTE_SAVE_FAILURE_MESSAGE);
        this.noteFormSubmitted = false;
      });
    }

  }

  editNote(index: string) {
    this.router.navigate(['../edit-note/' + index], { relativeTo: this.route });
  }
}
