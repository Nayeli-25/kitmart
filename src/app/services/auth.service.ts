import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.apiURL

  constructor(private http: HttpClient) { }

  registro(user:User):Observable<any>{
    return this.http.post(`${this.apiURL}users`,user);
  }

  login(user:User):Observable<any>{
    const token = this.http.post(`${this.apiURL}login`,user);
    console.log(token);
    
     return token;
  }

  logout(token:null):Observable<any>{
    const token2 = this.http.post(`${this.apiURL}logout`,token);
    console.log(token);
    
     return token;
  }
}
