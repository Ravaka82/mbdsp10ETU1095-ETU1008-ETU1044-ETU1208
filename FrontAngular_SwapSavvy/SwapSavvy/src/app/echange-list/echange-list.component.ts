import { Component, OnInit } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { Echange } from '../echange/echange.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-echange-list',
  standalone: true,
  imports: [RouterModule, CommonModule,MatInputModule,MatCardModule,MatButtonModule],
  templateUrl: './echange-list.component.html',
  styleUrl: './echange-list.component.css'
})
export class EchangeListComponent implements OnInit {
  echanges: any[] = [];
  user: any;

  constructor(
    private echangeService: EchangeService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.listesobjetsouhaite();
    } else {
      console.error('Aucun utilisateur trouvé dans localStorage');
    }
  }

  listesobjetsouhaite() {
    const utilisateur_id = this.user._id;
    this.echangeService.getEchangesByUtilisateur(utilisateur_id)
      .subscribe(
        (data) => {
          this.echanges = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des échanges:', error);
        }
      );
  }

  openConfirmDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet échange ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteEchange(id);
      }
    });
  }

  deleteEchange(id: string): void {
    this.echangeService.deleteEchange(id).subscribe(
      () => {
        this.snackBar.open('Échange supprimé avec succès.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        window.location.reload();
        this.listesobjetsouhaite(); 
      },
      error => {
        console.error('Erreur lors de la suppression de l\'échange :', error);
        this.snackBar.open('Erreur lors de la suppression de l\'échange.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }
  updateEchange(id: string) {
    this.router.navigate([`/updateEchange/${id}`]);
  }
}
