import { NotesService } from './../../service/notes.service';
import { Note } from './../../model/note.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  constructor(private notesService: NotesService, private router: Router,
    private route: ActivatedRoute) { }

  @Input() note: Note;
  index: string;

  ngOnInit() {
    this.index = this.note.note_id;
  }

  editNote() {
    this.router.navigate(['../edit-note/' + this.index], { relativeTo: this.route });
  }

  deleteNote() {

    const confirmation = confirm('Are you sure you want to delete the Note?');

    if (confirmation) {
      this.notesService.deleteNote(this.index).subscribe(
        res => {
          const status = res.status;
          if (status === 200) {
            console.log('note deleted successfully');
          } else {
            console.log('note could not be found');
          }
          this.notesService.removeNoteFromLocalMap(this.index);
        }, err => {
          console.error('Error occured in deleting the note: ');
          console.log(err.error);
        });
    }
  }

}
