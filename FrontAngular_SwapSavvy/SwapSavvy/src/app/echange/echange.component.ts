import { Component, OnInit } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { ObjetService } from '../services/objet.service';
import { Objet } from '../objets/objets.model';
import { Echange } from './echange.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-echange',
  standalone: true,
  imports: [],
  templateUrl: './echange.component.html',
  styleUrl: './echange.component.css'
})
export class EchangeComponent {
  // objetsUser: Objet[] = [];
  // objetsAll: Objet[] = [];
  // objetForm: FormGroup;

  // selectedObjetUser?: Objet;
  // selectedObjetOther?: Objet;

  // constructor(private echangeService: EchangeService, private objetService: ObjetService, private snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
  //   this.objetForm = this.fb.group({
  //     nom: ['']
  //   });
  // }

  // ngOnInit(): void {
  //   this.objetService.getObjetsUser().subscribe(data => this.objetsUser = data);
  //   this.objetService.getObjetsAll().subscribe(data => this.objetsAll = data);
  // }

  // proposerEchange(): void {
  //   const echange: Echange = {
  //     objetPropose: this.selectedObjetUser,
  //     objetDemande: this.selectedObjetOther,
  //     utilisateurProposant: this.selectedObjetUser.utilisateur,
  //     utilisateurDemande: this.selectedObjetOther.utilisateur,
  //     statut: 'En attente',
  //     dateProposition: new Date()
  //   };

  //   this.echangeService.proposerEchange(echange).subscribe(response => {
  //     alert('Échange proposé avec succès');
  //   });
  // }
}
