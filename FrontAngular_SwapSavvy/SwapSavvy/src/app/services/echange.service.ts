import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Echange } from '../echange/echange.model';

@Injectable({
  providedIn: 'root'
})
export class EchangeService {

  private apiUrl = 'https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/echanges';

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
  getEchangeEnAttente(utilisateur_id: string): Observable<any> {
    const url = `${this.apiUrl}/EchangePropose/${utilisateur_id}`;
    return this.http.get<any>(url);
  }
  updateEchangeStatutEnValidation(echange_id: string, statut: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/echange/${echange_id}/statut`, { statut });
  }
  getHistoriqueEchanges(utilisateur_id: string): Observable<any> {
    const url = `${this.apiUrl}/historique/${utilisateur_id}`;
    return this.http.get<any>(url);
  }

  countEchangesAccepted(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count/acceptes`).pipe(
      map(response => response.count)
    );
  }

  countEchangesRefused(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count/refus`).pipe(
      map(response => response.count)
    );
  }

  countEchangesEnAttente(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count/en-attente`).pipe(
      map(response => response.count)
    );
  }

  countEchangesEnCours(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count/en-cours`).pipe(
      map(response => response.count)
    );
  }

  getAllEchanges(): Observable<Echange[]> {
    return this.http.get<Echange[]>(this.apiUrl);
  }
}
