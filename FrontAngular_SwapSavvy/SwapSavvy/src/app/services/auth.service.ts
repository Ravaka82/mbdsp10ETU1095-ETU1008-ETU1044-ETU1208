import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { User } from '../objets/objets.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor( private http:HttpClient) { }
  private uri_api = environment.BASE_URL+'/api/auth';
  logIn(user:any):Observable<any>  {
    return this.http.post<any>(this.uri_api + '/login', user);
  }
  getUserLogged():Observable<any>  {
   let token :any='';
     token = localStorage.getItem("token");
     console.log(token);
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(this.uri_api + '/me',{ headers });
  }

  getStockedUser (){
    let user:any  ;
    user = localStorage.getItem("user")
    return JSON.parse(user);
  }

  isLogin() {
    if (localStorage.getItem("token") == null) {
      return false;
    }
    return true;
  }
  logOut() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

  }

  isAdmin() {

    const isUserAdminPromise = new Promise((resolve, reject) => {
      if(this.getStockedUser().role==1){
        resolve(true);
      }
      else{
        resolve(false)
      }

    });

    return isUserAdminPromise;
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(this.uri_api + '/register', user);
  }

}
