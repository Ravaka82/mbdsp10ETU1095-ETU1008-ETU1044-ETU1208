import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Echange } from '../echange/echange.model';

@Injectable({
  providedIn: 'root'
})
export class EchangeService {

  private apiUrl = 'http://localhost:8080/api/echange';

  constructor(private http: HttpClient) { }

  getAllEchanges(): Observable<Echange[]> {
    return this.http.get<Echange[]>(this.apiUrl);
  }

  createEchange(echange: Echange): Observable<Echange> {
    return this.http.post<Echange>(this.apiUrl, echange);
  }

  updateEchange(id: number, echange: Echange): Observable<Echange> {
    return this.http.put<Echange>(`${this.apiUrl}/${id}`, echange);
  }

  deleteEchange(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEchangeById(id: number): Observable<Echange> {
    return this.http.get<Echange>(`${this.apiUrl}/${id}`);
  }
}
