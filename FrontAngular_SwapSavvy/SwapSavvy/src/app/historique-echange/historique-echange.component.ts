import { Component } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-historique-echange',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule, MatTableModule],
  templateUrl: './historique-echange.component.html',
  styleUrl: './historique-echange.component.css'
})
export class HistoriqueEchangeComponent {
  echanges: any[] = [];
  displayedColumns: string[] = ['objetProposant', 'objetAcceptant', 'statut'];
  user: any;

  constructor(
    private echangeService: EchangeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.getHistoriqueEchanges();
    } else {
      console.error('Aucun utilisateur trouvé dans localStorage');
    }
  }

  getHistoriqueEchanges() {
    const utilisateur_id = this.user._id;
    this.echangeService.getHistoriqueEchanges(utilisateur_id)
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
