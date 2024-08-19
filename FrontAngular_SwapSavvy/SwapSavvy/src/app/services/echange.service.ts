import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Echange } from '../echange/echange.model';

@Injectable({
  providedIn: 'root'
})
export class EchangeService {

  private apiUrl = 'http://localhost:3000/api/echanges';

  constructor(private http: HttpClient) { }

  getEchangesByUtilisateur(utilisateur_id: string): Observable<any> {
    const url = `${this.apiUrl}/lisesobjetsouhaites/${utilisateur_id}`;
    return this.http.get<any>(url);
  }
  createEchange(echange: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, echange);
  }
  updateEchange(echange_id: string, updatedEchange: Echange): Observable<Echange> {
    return this.http.put<Echange>(`${this.apiUrl}/${echange_id}`, updatedEchange);
  }

  getEchangeById(id: string): Observable<Echange> {
    return this.http.get<Echange>(`${this.apiUrl}/${id}`);
  }

  deleteEchange(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateEchangeStatut(echange_id: string, statut: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/statut/${echange_id}`, { statut });
  }

}
