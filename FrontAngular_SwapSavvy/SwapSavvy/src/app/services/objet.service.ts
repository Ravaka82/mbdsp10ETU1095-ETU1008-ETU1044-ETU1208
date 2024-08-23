import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Objet } from '../objets/objets.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {

  private apiUrl = 'https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/objets';
  private apiUrlImage = 'https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/images';


  constructor(private http: HttpClient) { }

  getObjets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Méthode pour obtenir les objets de l'utilisateur connecté
  getObjetsUser(): Observable<Objet[]> {
    return this.http.get<Objet[]>(`${this.apiUrl}/user`);
  }

  // Méthode pour obtenir les objets des autres utilisateurs
  getObjetsAll(): Observable<Objet[]> {
    return this.http.get<Objet[]>(`${this.apiUrl}/all`);
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
  rechercheSimple(nom: string){
    let params = new HttpParams().set('nom', nom);
    return this.http.get<any>(`${this.apiUrl}/RechercheSimple`, { params });
  }
  updateUtilisateurId(id: string, utilisateurId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Modificationobjet/${id}/utilisateur`, { utilisateur_id: utilisateurId });
  }
  deleteObjetUtilisateur(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteobjets/${id}`);
  }
}
