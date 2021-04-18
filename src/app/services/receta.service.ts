import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  apiURL = environment.apiURL;
  header = new HttpHeaders({'Type-content': 'aplication/json'})

  constructor(private http: HttpClient) { }

  getReceta(id: number | string) {
    return this.http.get(`${this.apiURL}receta/`+ id, {
      headers: this.header
    });
  }

  getRecetas(){
    return this.http.get(`${this.apiURL}recetasUsuario`, {
      headers: this.header
    });
  }

  createReceta(form:Receta): Observable<Response> {
    let direccion = this.apiURL + "receta"
    return this.http.post<Response>(direccion, form,{ headers: this.header})
  }

  updateReceta( form:Receta): Observable<Response> {
    let direccion = this.apiURL + "receta/"
    return this.http.put<Response>(direccion, form,{ headers: this.header})
  }

  deleteReceta(id: number | string){
    return this.http.delete(`${this.apiURL}receta/` + id, {
      headers: this.header
    });
  }
}
