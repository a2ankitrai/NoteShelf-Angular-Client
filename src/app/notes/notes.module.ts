import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes/notes.component';
import { NotesCollectionComponent } from './notes-collection/notes-collection.component';
import { NotesEditComponent } from './notes-edit/notes-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteCardComponent } from './notes-collection/note-card/note-card.component';
import { QuillModule } from 'ngx-quill';
import { TrimHtmlPipe } from './pipe/trim-html.pipe';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NotesRoutingModule,
    QuillModule,
    NgbAlertModule
  ],
  declarations: [
    NotesComponent,
    NotesCollectionComponent,
    NotesEditComponent,
    NoteCardComponent,
    TrimHtmlPipe
  ]
})
export class NotesModule { }
