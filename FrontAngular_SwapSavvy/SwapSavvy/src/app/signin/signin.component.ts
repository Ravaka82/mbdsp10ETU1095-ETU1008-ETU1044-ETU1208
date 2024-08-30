import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router,RouterModule } from '@angular/router';
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
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email: string ='utilisateur@gmail.com';
  mot_de_passe: string='123';
  error: any='';

  constructor(private loginServ:AuthService,private router:Router) {}

  login() {
    let user = { email: this.email, mot_de_passe: this.mot_de_passe };

    this.loginServ.logIn(user).subscribe(
      (d: any) => {
        this.error = d.token;
        localStorage.setItem('token', d.token);
        this.loginServ.loggedIn = true;
        this.loginServ.getUserLogged().subscribe(
          (user: any) => {
            localStorage.setItem('user', JSON.stringify(user));
         
            this.router.navigate(['/list']);
          },
          (err: any) => {
            this.error = err.error.message;
          }
        );
      },
      (err: any) => {
        this.error = err.status === 404 ? err.error : "Mot de passe erroné";
      }
    );
  }


}
