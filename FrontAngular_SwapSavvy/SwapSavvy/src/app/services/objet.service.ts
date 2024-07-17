import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {
  private apiUrl = 'http://localhost:3000/api/objets';

  constructor(private http: HttpClient) { }

  getObjets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createObjet(objet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, objet);
  }

  updateObjet(id: string, objet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, objet);
  }

  deleteObjet(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
