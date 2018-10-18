import { Note } from './../../model/note.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  constructor() { }

  // note: Note;
  @Input() note: Note;
  index: string;

  ngOnInit() {
    this.index = this.note.note_id;
  }

}
