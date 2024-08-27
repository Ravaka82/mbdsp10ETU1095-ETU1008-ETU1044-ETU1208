import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  nom: string = '';
  prenom: string = '';
  email: string = '';
  mot_de_passe: string = '';
  latitude: number | undefined;
  longitude: number | undefined;

  // Gestion des erreurs
  inscriptionError: string = '';

  constructor(private registerService: AuthService, private router: Router) { }

  // Inscription
  inscription() {
    if (this.latitude === undefined || this.longitude === undefined) {
      this.inscriptionError = 'Latitude et longitude sont requises.';
      return;
    }

    const form = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      mot_de_passe: this.mot_de_passe,
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.registerService.signup(form).subscribe((result) => {
      if (result.error) {
        this.inscriptionError = result.error;
      } else {
        localStorage.setItem('signin', JSON.stringify(result));
        this.router.navigate(['/signin']);
      }
    });
  }
}
