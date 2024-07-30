import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../objets/objets.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email: string ='';
  mot_de_passe: string='';
  error: any='';

  constructor(private loginServ:AuthService,private router:Router) {}

  login() {
    let user:User = {
      email : this.email,
      mot_de_passe : this.mot_de_passe
    }

    this.loginServ.logIn(user).subscribe(
      (d:any)=>{
        this.error = d.token;
        localStorage.setItem('token', d.token);
        this.loginServ.loggedIn=true;
         this.loginServ.getUserLogged().subscribe(
        (d:any)=>{
          // this.nom =d.nom;
          localStorage.setItem('user',  JSON.stringify(d));
          this.router.navigate(['/list']);
        },
        (err:any) => {

            // Autre gestion d'erreur
            this.error = err.error.message;


        }
      );
         this.router.navigate(['/list']);
      },
      (err:any) => {
        if (err.status === 404) {
          this.error = err.error; // Récupération du message d'erreur "No user found"
        } else {
          // Autre gestion d'erreur
          this.error = "Mot de passe erroné";
        }

      }
    );
  }


}
