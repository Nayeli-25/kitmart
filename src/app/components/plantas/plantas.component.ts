import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Ws from "@adonisjs/websocket-client";
import { environmentSockets } from 'src/environments/environment.prod';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.css']
})
export class PlantasComponent implements OnInit {

  ws: any
  public humedad: any
  chat: any
  apiURL = environmentSockets.apiURL;

  constructor(private router:Router, private registroService: RegistroService) { 
    this.registroService.getHumedadPlantas().subscribe((resp: any)=> {
      this.humedad = resp
      console.log(resp)
    })
  }

  ngOnInit(): void {
    this.ws = Ws(`${this.apiURL}`)

    this.ws.connect()
    this.chat = this.ws.subscribe("kitmart")

    this.chat.on("plantas", (data: any)=> {
      this.registroService.getHumedadPlantas().subscribe((resp: any)=> {
        this.humedad = resp
        console.log(data)
      })
    })
  }

}
