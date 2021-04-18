import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { environmentSockets } from 'src/environments/environment.prod';
import Ws from "@adonisjs/websocket-client";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  humedades: any
  plagas: any
  temperaturas: any
  ws: any
  chat: any
  apiURL = environmentSockets.apiURL;

  constructor(private registroService: RegistroService) { 
    this.getRegistrosHumedades()
    this.getRegistrosPlagas()
    this.getRegistrosTemperaturas()
  }

  ngOnInit(): void {
    this.ws = Ws(`${this.apiURL}`)

    this.ws.connect()
    this.chat = this.ws.subscribe("kitmart")

    this.chat.on("historial", (data: any)=> {
      console.log(data)
    })
  }

  getRegistrosHumedades() {
    this.registroService.getHumedadesPlantas().subscribe((resp: any)=> {
      this.humedades = resp
      //console.log(resp)
    })
  }

  getRegistrosPlagas() {
    this.registroService.getPlagasAll().subscribe((resp: any)=> {
      this.plagas = resp
      //console.log(resp)
    })
  }

  getRegistrosTemperaturas() {
    this.registroService.getTemperaturas().subscribe((resp: any)=> {
      this.temperaturas = resp
      //console.log(resp)
    })
  }

}
