import { Component, OnInit } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Echange } from '../echange/echange.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ObjetService } from '../services/objet.service';
import { Objet } from '../objets/objets.model';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-echange-edit',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule , MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatSnackBarModule,MatCardModule],
  templateUrl: './echange-edit.component.html',
  styleUrl: './echange-edit.component.css'
})
export class EchangeEditComponent implements OnInit {
  objetsUser: Objet[] = [];
  objetsAll: Objet[] = [];
  echangeForm!: FormGroup;
  user: any;
  loading: boolean = false;
  echange: any; 
  echangeId: string | null = null;

  constructor(
    private echangeService: EchangeService,
    private objetService: ObjetService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.echangeForm = this.fb.group({
      objet_proposant: ['', Validators.required],
      objet_acceptant: ['', Validators.required],
      statut: [{ value: 'En cours', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.fetchObjets();
    this.loadEchange();
  }

  loadUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    } else {
      console.error('Aucun utilisateur trouvé dans localStorage');
    }
  }

  fetchObjets(): void {
    this.loading = true;
    this.objetService.getObjets().subscribe(
      data => {
        this.objetsUser = [];
        this.objetsAll = [];
        for (const objet of data) {
          if (objet.utilisateur_id._id === this.user._id) {
            this.objetsUser.push(objet);
          } else {
            this.objetsAll.push(objet);
          }
        }
        this.loading = false;
      },
      error => {
        console.error('Erreur lors de la récupération des objets :', error);
        this.loading = false;
      }
    );
  }

  loadEchange(): void {
    this.route.paramMap.subscribe(params => {
      this.echangeId = params.get('echange_id');
      if (this.echangeId) {
        this.fetchEchange(this.echangeId);
      } else {
        console.error('ID de l\'échange non trouvé dans les paramètres de l\'URL');
      }
    });
  }

  fetchEchange(echange_id: string): void {
    this.loading = true;
    this.echangeService.getEchangeById(echange_id).subscribe(
      data => {
        this.echange = data;
        this.echangeForm.patchValue({
          objet_proposant: data.objet_proposant,
          objet_acceptant: data.objet_acceptant,
          statut: data.statut
        });
        this.loading = false;
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'échange :', error);
        this.loading = false;
      }
    );
  }

  updateEchange(): void {
    if (this.echangeForm.valid && this.echange) {
      const updatedEchange = {
        _id: this.echange._id,
        utilisateur_proposant_id: this.echange.utilisateur_proposant_id,
        utilisateur_acceptant_id: this.echange.utilisateur_acceptant_id,
        objet_proposant: this.echangeForm.get('objet_proposant')?.value,
        objet_acceptant: this.echangeForm.get('objet_acceptant')?.value,
        statut: this.echangeForm.get('statut')?.value,
        date_proposition: this.echange.date_proposition,
        date_acceptation: null
      };

      console.log(updatedEchange);

      this.echangeService.updateEchange(this.echange._id, updatedEchange).subscribe(
        response => {
          this.snackBar.open('Échange mis à jour avec succès.', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.router.navigate(['/listesEchangesouhaites']);
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'échange :', error);
          this.snackBar.open('Erreur lors de la mise à jour de l\'échange.', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        }
      );
    } else {
      console.log('Formulaire invalide ou échange non chargé');
    }
  }
}
