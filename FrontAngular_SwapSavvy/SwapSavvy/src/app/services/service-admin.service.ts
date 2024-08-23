import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceAdminService {

  private apiUrl = 'https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/admin';
  constructor(private http: HttpClient) { }

  loginAdmin(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginAdmin`, credentials);
  }
}
