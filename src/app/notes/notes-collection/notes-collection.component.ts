import { Note } from './../model/note.model';
import { NotesService } from './../service/notes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {

  constructor(private notesService: NotesService) {

    console.log('notesCollection constructor');
    // fix below multiple assignment..
    this.noteCollection = this.notesService.notesArray;
    notesService.notesArrayObservable.subscribe(noteArray => {
      this.noteCollection = noteArray;
    });
  }

  noteCollection: Array<Note>;

  ngOnInit() {

    console.log('notesCollection ngOnInit');
    // move the logic of fillNotesArray from the service and create a resolver for the same.
    // check on how this noteCollection can always be in sync with notesService.noteArray
    // this.noteCollection = this.notesService.fillNotesArray();
    // console.log(this.noteCollection);

  }

}
