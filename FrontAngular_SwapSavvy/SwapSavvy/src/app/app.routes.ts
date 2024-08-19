import { Routes } from '@angular/router';
import { ObjetCreateComponent } from './objet-create/objet-create.component';
import { ObjetListComponent } from './objet-list/objet-list.component';
import { ObjetUpdateComponent } from './objet-update/objet-update.component';
import { DetailsObjetComponent } from './details-objet/details-objet.component';
import { RechercheAvanceObjetComponent } from './recherche-avance-objet/recherche-avance-objet.component';
import { ListRechercheSimpleComponent } from './list-recherche-simple/list-recherche-simple.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DemandeEchangeComponent } from './demande-echange/demande-echange.component';
import { EchangeCreateComponent } from './echange-create/echange-create.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create', component: ObjetCreateComponent },
  { path: 'list', component: ObjetListComponent },
  { path: 'proposeEchange', component: EchangeCreateComponent },
  { path: 'demandeEchange/:id', component: DemandeEchangeComponent },
  { path: 'update/:id', component: ObjetUpdateComponent },

  { path: 'DetailObjet/:id', component: DetailsObjetComponent },
  { path: 'rechercheAvance', component: RechercheAvanceObjetComponent },
  { path: 'listeRechercheSimple', component: ListRechercheSimpleComponent }
];
