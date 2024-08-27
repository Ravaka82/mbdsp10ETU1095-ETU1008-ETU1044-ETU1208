import { UtilisateurService } from './../services/utilisateur.service';
import { CategorieService } from './../services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObjetService } from '../services/objet.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-demande-echange',
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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './demande-echange.component.html',
  styleUrl: './demande-echange.component.css'
})
export class DemandeEchangeComponent implements OnInit {
  objetForm!: FormGroup;
  loading: boolean = false;
  utilisateurs: any[] = [];
  categories: any[] = [];
  selectedFile!: File;

  objetA: any; // Objet de l'utilisateur A
  objetB: any; // Objet désiré de l'utilisateur B

  constructor(
    private fb: FormBuilder,
    private objetService: ObjetService,
    private utilisateurService: UtilisateurService,
    private categorieService: CategorieService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.objetA = this.route.snapshot.queryParams['objetA'];
    this.objetB = this.route.snapshot.queryParams['objetB'];

    this.objetForm = this.fb.group({
      objet_a: [{ value: this.objetA.titre, disabled: true }],
      objet_b: [{ value: this.objetB.titre, disabled: true }],
      message: [''],
      date_echange: ['']
    });


    this.fetchUtilisateurs();
    this.fetchCategories();
  }

  fetchUtilisateurs() {
    this.utilisateurService.getUtilisateurs().subscribe(
      data => {
        this.utilisateurs = data;
      },
      error => {
        console.error('Error fetching utilisateurs:', error);
      }
    );
  }

  fetchCategories() {
    this.categorieService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createObjet(): void {
    this.loading = true;
    if (this.objetForm.valid) {
      const formData = new FormData();
      formData.append('utilisateur_id', this.objetForm.get('utilisateur_id')?.value);
      formData.append('categorie_id', this.objetForm.get('categorie_id')?.value);
      formData.append('titre', this.objetForm.get('titre')?.value);
      formData.append('description', this.objetForm.get('description')?.value);
      formData.append('statut', this.objetForm.get('statut')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.objetService.createObjet(formData).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/']);
          this.snackBar.open('Objet créé avec succès.', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        },
        (error) => {
          console.error('Erreur lors de la création de l\'objet : ', error);
          this.loading = false;
          this.snackBar.open('Erreur lors de la création de l\'objet.', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        }
      );
    }
  }

  submitExchangeRequest() {
    if (this.objetForm.valid) {
      this.loading = true;
      // Logique pour soumettre la demande d'échange
      console.log(this.objetForm.value);
      // Exemple : Envoyer les données à un service backend
    }
  }
}
