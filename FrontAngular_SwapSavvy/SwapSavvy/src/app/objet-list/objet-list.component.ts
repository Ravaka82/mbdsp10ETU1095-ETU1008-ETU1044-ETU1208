import { Component, OnInit } from '@angular/core';
import { ObjetService } from '../services/objet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-object-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    MatSelectModule,
    RouterModule

  ],
  templateUrl: './objet-list.component.html',
  styleUrl: './objet-list.component.css'
})
export class ObjetListComponent implements OnInit {
  objets: any[] = [];
  objetsUser: any[] = [];
  objetsAll: any[] = [];
  images: Map<string, string> = new Map();
  loading: boolean = false;
  objetForm: FormGroup;
  user: any;

  constructor(
    private objetService: ObjetService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.objetForm = this.fb.group({
      nom: ['']
    });
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    console.log('Données stockées dans localStorage :', user);
    if (user) {
      this.user = JSON.parse(user);
      console.log('Utilisateur récupéré :', this.user);
    } else {
      console.error('Aucun utilisateur trouvé dans localStorage');
    }
    if (history.state && history.state.objets) {
      this.objets = history.state.objets;
      this.objetsUser = [];
      this.objetsAll = [];

      for (const objet of this.objets) {
        if (objet.utilisateur_id._id === this.user._id) {
          this.objetsUser.push(objet);
        } else {
          this.objetsAll.push(objet);
        }
      }
    } else {
      this.fetchObjets();
    }
  }

  fetchObjets() {
    this.loading = true;
    this.objetService.getObjets().subscribe(
      data => {
        console.log('Objets récupérés :', data);


        this.objetsUser = [];
        this.objetsAll = [];

        for (const objet of data) {
          if (objet.utilisateur_id._id === this.user._id) {
            this.objetsUser.push(objet);
          } else {
            this.objetsAll.push(objet);
          }
        }

        console.log('Objets de l\'utilisateur :', this.objetsUser);
        console.log('Objets de tous les utilisateurs :', this.objetsAll);
        this.loading = false;
      },
      error => {
        console.error('Error fetching objets:', error);
        this.loading = false;
      }
    );
  }




  deleteObjet(id: string): void {
    this.loading = true;
    this.objetService.deleteObjet(id).subscribe(
      () => {
        this.snackBar.open('Objet supprimé avec succès.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this.fetchObjets();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'objet : ', error);
        this.loading = false;
        this.snackBar.open('Erreur lors de la suppression de l\'objet.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  rechercheSimple(): void {
    this.loading = true;
    const nom = this.objetForm.get('nom')?.value;
    this.objetService.rechercheSimple(nom).subscribe(
      data => {
        this.objets = data;
        this.objetsUser = data.filter((objet: { utilisateur_id: any; }) => objet.utilisateur_id === this.user._id);
        this.objetsAll = data.filter((objet: { utilisateur_id: any; }) => objet.utilisateur_id !== this.user._id);
        this.loading = false;
      },
      error => {
        console.error('Erreur:', error);
        this.loading = false;
        this.objets = [];
        this.objetsUser = [];
        this.objetsAll = [];
        this.snackBar.open('Aucun objet', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }
}
