import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
export const authGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);
  let snackBar = inject(MatSnackBar);
  if(authService.isLogin()==false){
    snackBar.open("Vous devez se connecter  ", 'Fermer', {
      duration: 3000,
    });
    router.navigate(["/signin"]);
    return false;

  }
  return true;
};
export const adminGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);
  let snackBar = inject(MatSnackBar);

  return authService.isAdmin()
  .then(authentifie => {
    if(authentifie) {
      console.log("Vous êtes admin, navigation autorisée !");
      return true;
    } else {
      console.log("Vous n'êtes pas admin ! Navigation refusée !");
      snackBar.open("Vous devez se connecter en tant que admin pour pouvoir faire cette action ", 'Fermer', {
        duration: 3000,
      });
      return false;
    }
  })
};
