import { NotesResolverService } from './resolver/notes-resolver.service';
import { NotesEditComponent } from './notes-edit/notes-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'create-note', component: NotesEditComponent },
  {
    path: 'edit-note/:id', component: NotesEditComponent, resolve: {
      note: NotesResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [NotesResolverService]
})
export class NotesRoutingModule { }