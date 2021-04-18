import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { errorMessage, successDialog, timeMessage } from 'src/app/functions/alerts';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kitmart';

  selectedId: number
  token: string
  user:User
  timeout: number

  constructor(private router:Router, private authService:AuthService) {
    
    this.token = localStorage.getItem('personalToken') 
    //this.router.navigate(['/home']);
  }

  public logOut() {
    timeMessage('Cerrando Sesión...', 1000)
    localStorage.setItem('personalToken', null)
    this.router.navigate(['/login'])
  }
  
  ngOnInit() {  }
}
