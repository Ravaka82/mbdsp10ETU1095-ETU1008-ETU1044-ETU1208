import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:3000/api/utilisateurs';

  constructor(private http: HttpClient) { }

  getUtilisateurs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createUtilisateur(objet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, objet);
  }

  updateUtilisateur(id: string, objet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, objet);
  }

  deleteUtilisateur(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
