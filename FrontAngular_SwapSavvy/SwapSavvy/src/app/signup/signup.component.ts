/*

import { Router } from '@angular/router';
//import { UserService } from './../services/user.service';
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
  form: any = {
    nom: '' ,
    prenom: '' ,
    mail: '' ,
    mdp: '' ,
    contact: ''
  } ;

  // Gestion des erreurs
  inscriptionError: string = '' ;

  constructor(private userService: UserService, private router: Router) { }

  // Inscription
  inscription() {
    this.userService.inscription(this.form).subscribe((result) => {
      if (result.error) this.inscriptionError = result.error ;
      else {
        localStorage.setItem('signin', JSON.stringify(result)) ;
        this.router.navigate(['user']) ;
      }
    }) ;
  }
}

*/
