import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  apiURL = environment.apiURL;
  header = new HttpHeaders({'Type-content': 'aplication/json'})

  getSensores(){
    return this.http.get(`${this.apiURL}sensor`, {
      headers: this.header
    });
  }

  getSensorPorTipo(tipo:string){
    return this.http.get(`${this.apiURL}sensores/` + tipo, {
      headers: this.header
    });
  }
}
