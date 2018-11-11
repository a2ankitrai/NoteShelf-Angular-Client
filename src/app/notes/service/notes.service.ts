import { Note } from './../model/note.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { v4 as uuid } from 'uuid';
import * as AppConstant from 'src/app/common/constant/app-constant';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient, private commonService: NsCommonService) {
    this.fillNotesArray();
  }

  notesArray: Array<Note> = [];

  fetchAllNotes() {
    const headers = this.setCommonHeaders();
    return this.http.get(AppConstant.NS_ENDPOINT + 'note/all', { headers: headers, 'observe': 'response' });
  }

  fetchNoteById(id) {
    return this.notesArray.filter(function (note) {
      return note.note_id === id;
    });
  }

  saveNote(note: Note) {
    note.note_id = uuid();
    const headers = this.setCommonHeaders();
    return this.http.post(AppConstant.NS_ENDPOINT + 'note', note, { headers: headers, 'observe': 'response' });

  }

  updateNote(newNote: Note) {
    console.log('inside update');
    const headers = this.setCommonHeaders();
    return this.http.put(AppConstant.NS_ENDPOINT + 'note/' + newNote.note_id, newNote, { headers: headers, 'observe': 'response' });

  }

  fillNotesArray() {
    this.fetchAllNotes().subscribe(
      response => {
        console.log(response);
        const notesResponse = response.body;

        for (const key in notesResponse) {
          if (notesResponse.hasOwnProperty(key)) {
            this.notesArray.push(notesResponse[key]);
          }
        }

        // below assignment is not working. check why?
        // this.notesArray = Object.values(notesResponse);
        // this.notesArray = Object.keys(notesResponse).map(i => notesResponse[i]);
      }, err => {
        const errors = err.error;
        console.log(errors);
      });
  }

  setCommonHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set(AppConstant.X_AUTH_TOKEN, this.commonService.getSessionToken());
    return headers;
  }

}
