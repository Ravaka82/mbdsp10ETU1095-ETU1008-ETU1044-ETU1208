import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createCategorie(objet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, objet);
  }

  updateCategorie(id: string, objet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, objet);
  }

  deleteCategorie(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
