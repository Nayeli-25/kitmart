import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Ws from "@adonisjs/websocket-client";
import { environmentSockets } from 'src/environments/environment.prod';
import { RegistroService } from 'src/app/services/registro.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ws: any
  public temperatura: any
  chat: any
  apiURL = environmentSockets.apiURL;

  constructor(private router:Router, private registroService: RegistroService) { 
    if (localStorage.getItem('personalToken')=="null"){
      this.router.navigate(['/login']);
    }

    this.registroService.getTemperatura().subscribe((resp: any)=> {
      this.temperatura = resp
      console.log(resp)
    })
  }

  ngOnInit(): void {
    this.ws = Ws(`${this.apiURL}`)

    this.ws.connect()
    this.chat = this.ws.subscribe("kitmart")

    this.chat.on("temperatura", (data: any)=> {
    this.registroService.getTemperatura().subscribe((resp: any)=> {
      this.temperatura = resp
      console.log(data)
    })
  })
}



}
