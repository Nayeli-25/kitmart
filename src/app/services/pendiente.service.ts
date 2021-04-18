import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Pendiente } from '../models/pendiente';

@Injectable({
  providedIn: 'root'
})
export class PendienteService {

  apiURL = environment.apiURL;
  header = new HttpHeaders({'Type-content': 'aplication/json'})

  constructor(private http: HttpClient) { }

  getPendientes(){
    return this.http.get(`${this.apiURL}pendientesUsuario`, {
      headers: this.header
    });
  }

  createPendiente(form:Pendiente): Observable<Response> {
    let direccion = this.apiURL + "pendiente"
    return this.http.post<Response>(direccion, form,{ headers: this.header})
  }

  updatePendiente( id: number | string) {
    return this.http.put(`${this.apiURL}pendiente/` + id, {
      headers: this.header
    });
  }

  deletePendiente(id: number | string){
    return this.http.delete(`${this.apiURL}pendiente/` + id, {
      headers: this.header
    });
  }
}
