import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesEditComponent } from '../notes-edit/notes-edit.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateNoteEditGuard implements CanDeactivate<NotesEditComponent> {

  canDeactivate(component: NotesEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> {

    if (component.noteForm.dirty) {
      return confirm('Note is not Saved. Are you sure want to move ahead?');
    }
    return true;
  }


}
