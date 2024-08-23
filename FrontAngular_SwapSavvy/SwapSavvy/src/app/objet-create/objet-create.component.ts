import { UtilisateurService } from './../services/utilisateur.service';
import { CategorieService } from './../services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObjetService } from '../services/objet.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-objet-create',
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
  ],
  templateUrl: './objet-create.component.html',
  styleUrls: ['./objet-create.component.css']
})
export class ObjetCreateComponent implements OnInit {
  objetForm!: FormGroup;
  loading: boolean = false;
  utilisateurs: any[] = [];
  categories: any[] = [];
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private objetService: ObjetService,
    private utilisateurService: UtilisateurService,
    private categorieService: CategorieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.objetForm = this.fb.group({
      utilisateur_id: [''],
      categorie_id: [''],
      titre: [''],
      description: [''],
      statut: ['disponible'],
      image: [''],
      etat: [''],
      valeur_estimee: ['']

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
      formData.append('etat', this.objetForm.get('etat')?.value);
      formData.append('valeur_estimee', this.objetForm.get('valeur_estimee')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.objetService.createObjet(formData).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/list']);
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
}
