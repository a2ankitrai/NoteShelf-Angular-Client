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

  notesMap: Map<string, Note>;
  notesMapSubject: Subject<Map<string, Note>>;
  notesMapObservable: Observable<Map<string, Note>>;

  constructor(private http: HttpClient, private commonService: NsCommonService) {
    console.log('Notes Service constructor called');

    this.notesMap = new Map<string, Note>();
    this.notesMapSubject = new Subject<Map<string, Note>>();
    this.notesMapObservable = this.notesMapSubject.asObservable();

  }

  // put url paths in a common files and use only constants here.

  fetchAllNotes() {
    const headers = this.setCommonHeaders();
    return this.http.get(AppConstant.NS_ENDPOINT + 'note/all', { headers: headers, 'observe': 'response' });
  }

  fetchNoteById(noteId: string) {
    return this.notesMap.get(noteId);
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

  removeNoteFromLocalMap(noteId: string) {
    this.notesMap.delete(noteId);
  }

  populateNotesMap() {
    if (this.notesMap.size !== 0) {
      this.notesMapSubject.next(this.notesMap);
    } else {

      this.fetchAllNotes().subscribe(
        response => {
          console.log('fill notes array: success');
          console.log(response);
          const notesResponse = response.body;

          for (const key in notesResponse) {
            if (notesResponse.hasOwnProperty(key)) {
              this.notesMap.set(notesResponse[key].note_id, notesResponse[key]);
            }
          }

          this.notesMapSubject.next(this.notesMap);

          // below assignment is not working. check why?
          // this.notesArray = Object.values(notesResponse);
          // this.notesArray = Object.keys(notesResponse).map(i => notesResponse[i]);
        }, err => {

          console.error('fill notes array: ERROR');
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
  }

  setCommonHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    if (this.commonService.getSessionToken() !== null && this.commonService.getSessionToken() !== undefined) {
      headers = headers.set(AppConstant.X_AUTH_TOKEN, this.commonService.getSessionToken());
    }

    if (this.commonService.jwtToken !== null && this.commonService.jwtToken !== undefined) {
      headers = headers.set(AppConstant.AUTHORIZATION, AppConstant.BEARER_ + this.commonService.jwtToken);
    }

    /**
     *
     *     if (this.loggedInUser.authType === 'APP') {
      this.commonService.sessionToken = undefined;
      this.localStorageService.removeItem(AppConstant.SESSION_TOKEN);
    } else {
      this.commonService.setJwtToken(undefined);
      this.cookieService.delete(AppConstant.JWT_SOCIAL_LOGIN_TOKEN);
    }
    */

    return headers;
  }

  clearNotesService() {

    this.notesMap.clear();
  }

}
