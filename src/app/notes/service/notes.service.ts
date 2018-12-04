import { Note } from './../model/note.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NsCommonService } from 'src/app/common/service/ns-common.service';
import { v4 as uuid } from 'uuid';
import * as AppConstant from 'src/app/common/constant/app-constant';
import { Observable, Subject } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class NotesService {

  notesArray: Array<Note> = [];

  notesArrayObservable: Observable<Array<Note>>;
  notesArraySubject: Subject<Array<Note>>;

  constructor(private http: HttpClient, private commonService: NsCommonService) {
    console.log('Notes Service constructor called');
    this.notesArraySubject = new Subject<Array<Note>>();
    this.notesArrayObservable = this.notesArraySubject.asObservable();
    this.fillNotesArray();
    // this.commonService.userLoggedInObservable.subscribe((val: boolean) => {
    //   if (val === false) {
    //     this.notesArray = [];
    //   }
    // });
  }

  // put url paths in a common files and use only constants here.

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

  deleteNote(noteId: string) {
    console.log('inside delete note');
    const headers = this.setCommonHeaders();
    return this.http.delete(AppConstant.NS_ENDPOINT + 'note/' + noteId, { headers: headers, 'observe': 'response' });
  }

  deleteNoteFromLocalNotesArray(noteId: string) {
    this.notesArray.forEach((note, index, array) => {
      if (note.note_id === noteId) {
        array.splice(index, 1);
      }
    });
    this.notesArraySubject.next(this.notesArray);
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
        this.notesArraySubject.next(this.notesArray);
        // below assignment is not working. check why?
        // this.notesArray = Object.values(notesResponse);
        // this.notesArray = Object.keys(notesResponse).map(i => notesResponse[i]);
      }, err => {
        const errors = err.error;
        console.log(err);
        // Handle the scenario whent the mongodb server is down
        /**
         * exceptionMessage: "Timed out after 30000 ms while waiting to connect.
         * Client view of cluster state is
         * {type=UNKNOWN, servers=[{address=localhost:27017, type=UNKNOWN, state=CONNECTING,
         * exception={com.mongodb.MongoSocketOpenException: Exception opening socket},
         * caused by {java.net.ConnectException: Connection refused (Connection refused)}}];
         */
        console.log('some error occurred while retrieving the notes. We will be trying again.');
      });
  }

  setCommonHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    console.log('session token of commonservice: ' + this.commonService.getSessionToken());
    if (this.commonService.getSessionToken() !== null && this.commonService.getSessionToken() !== undefined) {
      headers = headers.set(AppConstant.X_AUTH_TOKEN, this.commonService.getSessionToken());
    }
    if (this.commonService.jwtToken !== null && this.commonService.jwtToken !== undefined) {
      headers = headers.set(AppConstant.AUTHORIZATION, AppConstant.BEARER_ + this.commonService.jwtToken);
    }

    return headers;
  }

}
