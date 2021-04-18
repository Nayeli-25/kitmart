import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiURL = environment.apiURL;
  header = new HttpHeaders({'Type-content': 'aplication/json'})

  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get(`${this.apiURL}usuario`, {
      headers: this.header
    });
  }

  updateUser( form:User): Observable<Response> {
    let direccion = this.apiURL + "users/"
    return this.http.put<Response>(direccion, form,{ headers: this.header})
  }
}
