import { Routes } from '@angular/router';
import { ObjetCreateComponent } from './objet-create/objet-create.component';
import { ObjetListComponent } from './objet-list/objet-list.component';

export const routes: Routes = [
  { path: 'create', component: ObjetCreateComponent },
  { path: 'list', component: ObjetListComponent },
];
