import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  apiURL = environment.apiURL;
  header = new HttpHeaders({'Type-content': 'aplication/json'})

  constructor(private http: HttpClient) { }

  getRegistros(){
    return this.http.get(`${this.apiURL}registro`, {
      headers: this.header
    });
  }

  getEstadoRefri() {
    return this.http.get(`${this.apiURL}estado`, {
      headers: this.header
    });
  }

  getUltimoRegistro(id: number | string) {
    return this.http.get(`${this.apiURL}ultimoRegistro/`+ id, {
      headers: this.header
    });
  }

  getTemperatura() {
    return this.http.get(`${this.apiURL}temperatura`, {
      headers: this.header
    });
  }

  getTemperaturas() {
    return this.http.get(`${this.apiURL}temperaturas`, {
      headers: this.header
    });
  }

  getHumedadPlantas() {
    return this.http.get(`${this.apiURL}humedad`, {
      headers: this.header
    });
  }

  getHumedadesPlantas() {
    return this.http.get(`${this.apiURL}humedades`, {
      headers: this.header
    });
  }

  updateLed (id: string, estado: number) {
    return this.http.put(`${this.apiURL}leds/` + id + "/" + estado,  {
      headers: this.header
    });
  }

  prevencionAccidentes () {
    return this.http.get(`${this.apiURL}prevencionAccidentes`,  {
      headers: this.header
    });
  }

  controlPlagas () {
    return this.http.get(`${this.apiURL}plagas`,  {
      headers: this.header
    });
  }

  getPlagasAll () {
    return this.http.get(`${this.apiURL}plagasAll`,  {
      headers: this.header
    });
  }
}

