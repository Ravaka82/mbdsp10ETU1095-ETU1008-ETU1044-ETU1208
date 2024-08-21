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
import { ObjetService } from '../services/objet.service';

@Component({
  selector: 'app-echange-list-propose',
  standalone: true,
  imports: [RouterModule, CommonModule,MatInputModule,MatCardModule,MatButtonModule],
  templateUrl: './echange-list-propose.component.html',
  styleUrl: './echange-list-propose.component.css'
})
export class EchangeListProposeComponent {
  echanges: any[] = [];
  user: any;

  constructor(
    private echangeService: EchangeService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private objetService: ObjetService,
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.listesobjetpropose();
    } else {
      console.error('Aucun utilisateur trouvé dans localStorage');
    }
  }

  listesobjetpropose() {
    const utilisateur_id = this.user._id;
    this.echangeService.getEchangeEnAttente(utilisateur_id)
      .subscribe(
        (data) => {
          this.echanges = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des échanges:', error);
        }
      );
  }
  AcceptationEchange(echangeId: string, utilisateurIdProposant: string, utilisateurIdAcceptant: string,objetProposant:string, objetAcceptant: string) {
    // First, update the echange status
    this.echangeService.updateEchangeStatutEnValidation(echangeId, 'accepter').subscribe(
      () => {
        // After updating the echange status, update the utilisateur_id for each object
        this.objetService.updateUtilisateurId(objetProposant, utilisateurIdAcceptant).subscribe(
          () => {
            // Update the other object
            this.objetService.updateUtilisateurId(objetAcceptant, utilisateurIdProposant).subscribe(
              () => {
                this.snackBar.open('Vous avez accepté et les objets ont été échangés.', 'Fermer', {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'end'
                });
                this.listesobjetpropose(); // Refresh the list after acceptance
              },
              error => {
                console.error('Erreur lors de la mise à jour de l\'objet acceptant.', error);
                this.snackBar.open('Erreur lors de la mise à jour de l\'objet acceptant.', 'Fermer', {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'end'
                });
              }
            );
          },
          error => {
            console.error('Erreur lors de la mise à jour de l\'objet proposant.', error);
            this.snackBar.open('Erreur lors de la mise à jour de l\'objet proposant.', 'Fermer', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
          }
        );
      },
      error => {
        console.error('Erreur lors de l\'acceptation.', error);
        this.snackBar.open('Erreur lors de l\'acceptation.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }
  
RefuserEchange(id: string){
  this.echangeService.updateEchangeStatutEnValidation(id, 'refuser').subscribe(
    () => {
      this.snackBar.open('Vous avez refuser la proposition.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      this.listesobjetpropose();
    },
    error => {
      console.error('Erreur lors du refus.', error);
      this.snackBar.open('Erreur lors du refus.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
  );
}
}
