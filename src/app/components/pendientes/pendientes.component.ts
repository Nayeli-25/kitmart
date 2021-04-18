import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PendienteService } from 'src/app/services/pendiente.service';
import { errorMessage, successDialog, timeMessage } from 'src/app/functions/alerts';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {

  public pendientes:Array<any> = []
  pendienteForm = new FormGroup ({
    descripcion: new FormControl('')
  })

  constructor(private pendienteService:PendienteService, private router:Router) { 
    this.pendienteService.getPendientes().subscribe((resp: any)=> {
      this.pendientes = resp
      console.log(resp)
    })
  }

  eliminarPendiente(id: number) {
    this.pendienteService.deletePendiente(id).subscribe((resp: any) => {
      console.log(resp)
      this.router.navigate(['/home'])
    })
  }

  postForm(form: any) {
    this.pendienteService.createPendiente(form).subscribe((resp: any) => {
      timeMessage('Guardando...', 1500).then(() => {
        console.log(resp)
        successDialog('Guardado')
      })
    }, error => {
      errorMessage('Error, no se pudo guardar')
    });
  }

  ngOnInit(): void {
  }

}
