import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ObjetService } from '../services/objet.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { CategorieService } from '../services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-objet-update',
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
  templateUrl: './objet-update.component.html',
  styleUrls: ['./objet-update.component.css']
})
export class ObjetUpdateComponent implements OnInit {
  objetForm!: FormGroup;
  loading: boolean = false;
  utilisateurs: any[] = [];
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private objetService: ObjetService,
    private utilisateurService: UtilisateurService,
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.objetForm = this.fb.group({
      utilisateur_id: ['', Validators.required],
      categorie_id: ['', Validators.required],
      titre: ['', Validators.required],
      description: [''],
      statut: ['disponible', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.objetService.getObjetById(id).subscribe(
        (data: any) => {
          this.objetForm.patchValue(data);
        },
        (error: any) => {
          console.error('Error fetching objet:', error);
        }
      );
    }

    this.fetchUtilisateurs();
    this.fetchCategories();
  }

  fetchUtilisateurs() {
    this.utilisateurService.getUtilisateurs().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
      },
      (error: any) => {
        console.error('Error fetching utilisateurs:', error);
      }
    );
  }

  fetchCategories() {
    this.categorieService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  updateObjet(): void {
    if (this.objetForm.valid) {
      this.loading = true;
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.objetService.updateObjet(id, this.objetForm.value).subscribe(
          () => {
            this.loading = false;
            this.router.navigate(['/']);
            this.snackBar.open('Objet mis à jour avec succès.', 'Fermer', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
          },
          (error: any) => {
            console.error('Erreur lors de la mise à jour de l\'objet : ', error);
            this.loading = false;
            this.snackBar.open('Erreur lors de la mise à jour de l\'objet.', 'Fermer', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
          }
        );
      }
    }
  }
}
