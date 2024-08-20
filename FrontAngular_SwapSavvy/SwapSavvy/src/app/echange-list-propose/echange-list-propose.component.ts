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

}
