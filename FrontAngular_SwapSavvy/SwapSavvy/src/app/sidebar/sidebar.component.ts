import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

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
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  clearSession() {
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']); 
  }
onLogout(): void {
  try {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');

   
    this.authService.loggedIn = false;
    localStorage.removeItem('user');

   
    this.router.navigate(['/login']);

   
    this.snackBar.open('Déconnexion réussie', 'Fermer', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });

  } catch (error) {
    
    console.error('Erreur lors de la déconnexion:', error);
    
    this.snackBar.open('Une erreur est survenue lors de la déconnexion', 'Fermer', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['snack-bar-error'] 
    });
  }
}
  /*onLogout() {
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
  }*/
}
