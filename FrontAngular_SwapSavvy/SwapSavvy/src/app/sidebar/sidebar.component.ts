import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Correction du nom du champ (styleUrls au lieu de styleUrl)
})
export class SidebarComponent implements OnInit {

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  clearSession() {
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']); 
  }

  onLogout() {
    this.utilisateurService.logout().subscribe(
      response => {
        this.snackBar.open('Déconnexion réussie', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this.clearSession(); 
        
      },
      error => {
        console.error('Erreur lors de la déconnexion', error);
        this.snackBar.open('Erreur lors de la déconnexion', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }
}
