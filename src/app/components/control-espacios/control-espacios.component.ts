import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { SensorService } from 'src/app/services/sensor.service';
import { environmentSockets } from 'src/environments/environment.prod';
import { Sensor } from '../../models/sensor';
import Ws from "@adonisjs/websocket-client";

@Component({
  selector: 'app-control-espacios',
  templateUrl: './control-espacios.component.html',
  styleUrls: ['./control-espacios.component.css']
})
export class ControlEspaciosComponent implements OnInit {

  registrosRefrigerador: any = ''
  registrosUtrasonico: any = ''
  registrosPlagas: any = ''
  ws: any
  chat: any
  apiURL = environmentSockets.apiURL;

  constructor(private registroService:RegistroService, private sensorService:SensorService) { 
    this.getEstadoRefri()
    this.getUltrasonico()
    this.getRegistrosPlagas()
  }

  ngOnInit(): void {
    this.ws = Ws(`${this.apiURL}`)

    this.ws.connect()
    this.chat = this.ws.subscribe("kitmart")

    this.chat.on("controlEspacios", (data: any)=> {
      console.log(data)
    })
  }

  getEstadoRefri() {
    this.registroService.getEstadoRefri().subscribe((resp: any)=> {
      this.registrosRefrigerador = resp
      console.log(resp)
    })
  }

  getUltrasonico() {
    this.registroService.prevencionAccidentes().subscribe((resp: any)=> {
      this.registrosUtrasonico = resp
      console.log(resp)
    })
  }

  getRegistrosPlagas() {
    this.registroService.controlPlagas().subscribe((resp: any)=> {
      this.registrosPlagas = resp
      console.log(resp)
    })
  }

}
