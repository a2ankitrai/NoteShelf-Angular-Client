import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Note } from '../model/note.model';
import { NotesService } from '../service/notes.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesResolverService implements Resolve<object> {

  constructor(private notesService: NotesService, private route: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): object {
    const id = route.paramMap.get('id');
    return this.notesService.fetchNoteById(route.params.id);
  }
}
