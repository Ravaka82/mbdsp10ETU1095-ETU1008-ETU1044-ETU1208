import { Router } from '@angular/router';
//import { UserService } from './../services/user.service';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import  {RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, MatButtonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  // Formulaire d'inscription

  nom: string = '';
  prenom: string = '';
  email: string = '';
  mot_de_passe: string = '';

  // Gestion des erreurs
  inscriptionError: string = '' ;

  constructor(private registerService: AuthService, private router: Router) { }

  // Inscription
  inscription() {

    const form = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      mot_de_passe: this.mot_de_passe
    };

    this.registerService.signup(form).subscribe((result) => {
      if (result.error) this.inscriptionError = result.error ;
      else {
        localStorage.setItem('signin', JSON.stringify(result)) ;
        this.router.navigate(['user']) ;
      }
    }) ;
  }
}

