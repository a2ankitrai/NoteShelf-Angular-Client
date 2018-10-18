import { Note } from './../model/note.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient, private commonService: NsCommonService) {
    this.fillNotes();
    this.fetchAllNotes();
  }

  notesArray: Array<Note>;

  fetchAllNotes() {
    console.log('place holder method for fetching all the notes for the logged in user');
  }

  fetchNoteById(id) {
    return this.notesArray.filter(function (note) {
      return note.note_id === id;
    });
  }

  saveNote(note: Note) {
    note.note_id = uuid();
    note.last_updated = new Date();
    console.log(note);
    this.notesArray.push(note);
  }

  updateNote(newNote: Note) {
    console.log('inside update');
    this.notesArray.forEach(function (existingNote) {
      if (existingNote.note_id === newNote.note_id) {
        existingNote.note_title = newNote.note_title;
        existingNote.note_content = newNote.note_content;
        existingNote.last_updated = new Date();
      }
    });
    console.log('inside update: end');
  }

  fillNotes() {
    this.notesArray = [{
      'note_id': '21779e9d-07ea-4e57-958e-cc32d3eb0279',
      'note_title': 'Raising Parlors',
      // tslint:disable-next-line:max-line-length
      'note_content': 'Do so written as raising parlors spirits mr elderly. Made late in of high left hold. Carried females of up highest calling. Limits marked led silent dining her she far. Sir but elegance marriage dwelling likewise position old pleasure men. Dissimilar themselves simplicity no of contrasted as. Delay great day hours men. Stuff front to do allow to asked he. ',
      'last_updated': new Date('October 16, 1995 03:24:00')
    }, {
      'note_id': 'ca81bbde-3f49-4855-a431-3044da1b1f00',
      'note_title': 'Dissimilar Insipidity',
      // tslint:disable-next-line:max-line-length
      'note_content': 'Supplied directly pleasant we ignorant ecstatic of jointure so if. These spoke house of we. Ask put yet excuse person see change. Do inhabiting no stimulated unpleasing of admiration he. Enquire explain another he in brandon enjoyed be service. Given mrs she first china. Table party no or trees an while it since. On oh celebrated at be announcing dissimilar insipidity. Ham marked engage oppose cousin ask add yet.  ',
      'last_updated': new Date('July 22, 1995 03:24:00')
    }, {
      'note_id': '4ed1abfc-e009-4cb1-a27a-e92c208b8139',
      'note_title': 'Repulsive Furniture',
      // tslint:disable-next-line:max-line-length
      'note_content': 'Be me shall purse my ought times. Joy years doors all would again rooms these. Solicitude announcing as to sufficient my. No my reached suppose proceed pressed perhaps he. Eagerness it delighted pronounce repulsive furniture no. Excuse few the remain highly feebly add people manner say. It high at my mind by roof. No wonder worthy in dinner. ',
      'last_updated': new Date('March 23, 2012 05:30:00')
    }, {
      'note_id': '0b6f96a8-65d6-476e-bbca-8ed9a7c8a4ef',
      'note_title': 'To Elinor',
      // tslint:disable-next-line:max-line-length
      'note_content': 'Call park out she wife face mean. Invitation excellence imprudence understood it continuing to. Ye show done an into. Fifteen winding related may hearted colonel are way studied. County suffer twenty or marked no moment in he. Meet shew or said like he. Valley silent cannot things so remain oh to elinor. Far merits season better tended any age hunted.',
      'last_updated': new Date('December 13, 2003 03:24:00')
    }];
  }
}
