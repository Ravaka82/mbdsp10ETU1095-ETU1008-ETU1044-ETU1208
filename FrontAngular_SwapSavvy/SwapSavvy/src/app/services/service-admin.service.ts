import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceAdminService {

  private apiUrl = 'http://localhost:3000/api/admin';
  constructor(private http: HttpClient) { }

  loginAdmin(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginAdmin`, credentials);
  }
}
