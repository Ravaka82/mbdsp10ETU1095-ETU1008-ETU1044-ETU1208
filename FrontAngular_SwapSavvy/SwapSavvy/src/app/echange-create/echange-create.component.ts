import { Component, OnInit } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { Echange } from '../echange/echange.model';
import { ObjetService } from '../services/objet.service';
import { Objet } from '../objets/objets.model';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-echange-create',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './echange-create.component.html',
  styleUrl: './echange-create.component.css'
})
export class EchangeCreateComponent {
  echange: Echange = {
    id: 0,
    objetOffreId: 0,
    objetDemandeId: 0,
    utilisateurOffreId: 0,
    utilisateurDemandeId: 0,
    dateProposition: new Date(),
    dateEchange: new Date(),
    statut: 'En attente'
  };

  objetsUser: Objet[] = [];
  objetsAll: Objet[] = [];
  objetForm: FormGroup;

  selectedObjetUser?: Objet;
  selectedObjetOther?: Objet;

  constructor(private echangeService: EchangeService, private objetService: ObjetService, private snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.objetForm = this.fb.group({
      nom: ['']
    });
  }

  ngOnInit(): void {
    this.objetService.getObjetsUser().subscribe(data => this.objetsUser = data);
    this.objetService.getObjetsAll().subscribe(data => this.objetsAll = data);
  }

  proposerEchange(): void {
    if (!this.selectedObjetUser || !this.selectedObjetOther) {
      this.snackBar.open('Veuillez sélectionner les deux objets avant de proposer un échange.', 'Fermer', {
        duration: 3000
      });
      return;
    }

    const echange: Echange = {
      id: 0, 
      objetOffreId: this.selectedObjetUser.id,
      objetDemandeId: this.selectedObjetOther.id,
      utilisateurDemandeId: this.selectedObjetOther.utilisateur.id,
      utilisateurOffreId: this.selectedObjetUser.utilisateur.id,
      dateProposition: new Date(),
      dateEchange: undefined,
      statut: 'En attente'
    };

    this.echangeService.createEchange(echange).subscribe(() => {
      this.snackBar.open('Échange proposé avec succès', 'Fermer', {
        duration: 3000
      });
      this.router.navigate(['/']); // Redirige vers une autre page après succès
    }, error => {
      this.snackBar.open('Une erreur est survenue. Veuillez réessayer.', 'Fermer', {
        duration: 3000
      });
    });
  }
}
