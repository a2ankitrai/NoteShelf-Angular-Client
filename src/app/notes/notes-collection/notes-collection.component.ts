import { Note } from './../model/note.model';
import { NotesService } from './../service/notes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {

  constructor(private notesService: NotesService) { }

  noteCollection: Array<Note>;

  ngOnInit() {
    this.noteCollection = this.notesService.notesArray;
  }

}
