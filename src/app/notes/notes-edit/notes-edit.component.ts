import { NotesService } from './../service/notes.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from '../model/note.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.css']
})
export class NotesEditComponent implements OnInit {

  noteForm: FormGroup;
  // @Input() note: Note;
  note: Note;
  pageHeader: string;
  saveUpdateLabel: string;

  constructor(private formBuilder: FormBuilder, private notesService: NotesService, private route: ActivatedRoute) { }

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
      note_title: [noteTitleText, Validators.required],
      note_content: [noteContentText, Validators.required]
    });
  }

  onNoteFormSubmit() {
    console.log(this.noteForm.value);
    if (this.note.note_id) {
      this.note.note_title = this.noteForm.value['note_title'];
      this.note.note_content = this.noteForm.value['note_content'];
      this.notesService.updateNote(this.note);
      console.log('note updated successfully');
    } else {
      this.notesService.saveNote(this.noteForm.value);
      console.log('note saved successfully');
    }

    this.noteForm.reset();
  }
}
