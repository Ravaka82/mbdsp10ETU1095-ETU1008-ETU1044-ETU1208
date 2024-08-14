import { Component, OnInit } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { Echange } from '../echange/echange.model';
import { ObjetService } from '../services/objet.service';
import { Objet } from '../objets/objets.model';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-echange-create',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatSnackBarModule],
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

  constructor(private echangeService: EchangeService, private objetService: ObjetService, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.objetForm = this.fb.group({
      nom: ['']
    });
  }

  ngOnInit(): void {

    this.objetService.getObjetsUser().subscribe(
      data => {
        this.objetsUser = data;
        console.log('Objets de l\'utilisateur récupérés:', this.objetsUser);
      },
      error => {
        console.error('Erreur lors de la récupération des objets de l\'utilisateur:', error);
      }
    );
      // Récupérer l'ID de l'objet demandé depuis la route
      const objetDemandeId = this.route.snapshot.paramMap.get('id');

      if (objetDemandeId) {

        this.objetService.getObjetsAll().subscribe(
          data => {
            this.objetsAll = data;
            console.log('Tous les autres objets récupérés:', this.objetsAll);
            // Trouver et sélectionner l'objet correspondant à l'ID
            this.selectedObjetOther = this.objetsAll.find(objet => objet.id === parseInt(objetDemandeId));
            if (this.selectedObjetOther) {
              console.log('Objet demandé pré-rempli depuis sélection :', this.selectedObjetOther);
            }
          },
          error => {
            console.error('Erreur lors de la récupération de tous les autres objets:', error);
          }
        );
      }
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
