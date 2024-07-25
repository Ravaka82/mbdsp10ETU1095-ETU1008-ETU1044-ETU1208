import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {

  private apiUrl = 'http://localhost:3000/api/objets';
  private apiUrlImage = 'http://localhost:3000/api/images';


  constructor(private http: HttpClient) { }

  getObjets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createObjet(objet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, objet);
  }

  getObjetById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/DetailsObjet/${id}`);
  }

  updateObjet(id: string, objet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, objet);
  }

  getImageObjet(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/FindAllImageObject}`);
  }

  deleteObjet(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  uploadImage(formData: FormData, objetId: string) {
    return this.http.post<any>(`${this.apiUrlImage}/upload/${objetId}`, formData);
  }
  rechercheAvanceObjets(nomCategorie: string, titre: string, statut: string): Observable<any> {
    const body = { nomCategorie, titre, statut };
    return this.http.post<any>(`${this.apiUrl}/rechercheAvance`, body);
  }

}
