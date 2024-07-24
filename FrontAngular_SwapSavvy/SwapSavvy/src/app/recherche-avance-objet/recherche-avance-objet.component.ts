import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorieService } from './../services/categorie.service';
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
  selector: 'app-recherche-avance-objet',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    MatSelectModule,],
  templateUrl: './recherche-avance-objet.component.html',
  styleUrl: './recherche-avance-objet.component.css'
})
export class RechercheAvanceObjetComponent implements OnInit {
  objets: any[] = [];
  objetForm!: FormGroup;
  loading: boolean = false;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private objetService: ObjetService,
    private categorieService: CategorieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.objetForm = this.fb.group({
      utilisateur_id: [''],
      categorie_id: [''],
      titre: ['']
    });


    this.fetchCategories();
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
  recherche(): void {
    this.loading = true;
    if (this.objetForm.valid) {
      const formData = new FormData();
      const nomCategorie= this.objetForm.get('nomCategorie')?.value;
      const titre= this.objetForm.get('titre')?.value;
      const statut= this.objetForm.get('statut')?.value;
      console.log(statut);

      this.objetService.rechercheAvanceObjets(nomCategorie,titre,statut).subscribe(
        data => {
          this.objets = data;
          this.loading = false;
          this.router.navigate(['list']);
         
        },
        error => {
          console.error('Error fetching objects', error);
          this.loading = false;
          this.snackBar.open('Aucun objet', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        }
      );
    }
  }

}
