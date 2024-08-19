import { Component, OnInit } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { Echange } from '../echange/echange.model';
import { ObjetService } from '../services/objet.service';
import { Objet } from '../objets/objets.model';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-echange-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule , MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './echange-create.component.html',
  styleUrl: './echange-create.component.css'
})
export class EchangeCreateComponent {
  objetsUser: Objet[] = [];
  objetsAll: Objet[] = [];
  echangeForm!: FormGroup;
  user: any;
  loading: boolean = false;
  selectedObjetUser?: Objet;
  selectedObjetOther?: Objet;
 

  constructor(private echangeService: EchangeService, private objetService: ObjetService, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.echangeForm = this.fb.group({
      objet_proposant: ['', Validators.required],
      objet_acceptant: ['', Validators.required]
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
    this.fetchObjets();
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
  proposerEchange(): void {
    
    if (this.echangeForm.valid) {
      const echangeData = {
        utilisateur_proposant_id: this.user._id,
        objet_proposant: this.echangeForm.get('objet_proposant')?.value,
        objet_acceptant: this.echangeForm.get('objet_acceptant')?.value
      };
     
      this.echangeService.createEchange(echangeData).subscribe(
        response => {
          this.snackBar.open('Échange proposé avec succès.', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.router.navigate(['/path-after-success']); // Ajustez au besoin
        },
        error => {
          console.error('Erreur lors de la proposition de l\'échange:', error);
          this.snackBar.open('Erreur lors de la proposition de l\'échange.', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
  
}