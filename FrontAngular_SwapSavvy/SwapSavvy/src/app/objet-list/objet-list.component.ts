import { Component, OnInit } from '@angular/core';
import { ObjetService } from '../services/objet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  loading: boolean = false;

  constructor(
    private objetService: ObjetService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchObjets();
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
}
