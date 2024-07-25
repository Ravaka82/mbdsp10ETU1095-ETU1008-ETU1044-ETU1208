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
  images: Map<string, string> = new Map();
  loading: boolean = false;
  objetForm: FormGroup;

  constructor(
    private objetService: ObjetService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.objetForm = this.fb.group({
      image: ['']
    });
  }

  ngOnInit(): void {
    if (history.state && history.state.objets) {
      this.objets = history.state.objets;
    } else {
      this.fetchObjets();
    }
  }

  fetchObjets() {
    this.loading = true;
    this.objetService.getObjets().subscribe(
      data => {
        this.objets = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching objets:', error);
        this.loading = false;
      }
    );
  }

  getImageForObjet(objetId: string): string | undefined {
    return this.images.get(objetId);
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

  onFileSelected(event: any, objetId: string) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    this.objetService.uploadImage(formData, objetId).subscribe(
      (data: any) => {
        // Mettre à jour l'objet avec l'image
        this.images.set(objetId, data.filename); // Mettre à jour l'image dans le map
        this.snackBar.open('Image téléchargée avec succès.', 'Fermer', { duration: 3000 });
      },
      (error: any) => {
        console.error('Erreur lors du téléchargement de l\'image : ', error);
        this.snackBar.open('Erreur lors du téléchargement de l\'image.', 'Fermer', { duration: 3000 });
      }
    );
  }
}
