import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { errorMessage, successDialog, timeMessage } from 'src/app/functions/alerts';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-edit-receta',
  templateUrl: './edit-receta.component.html',
  styleUrls: ['./edit-receta.component.css']
})
export class EditRecetaComponent implements OnInit {

  recetas: any = ''  
  recetaForm = new FormGroup ({
    id: new FormControl(this.rutaActiva.snapshot.params.id),
    nombre: new FormControl(this.rutaActiva.snapshot.params.nombre),
    ingredientes: new FormControl(this.rutaActiva.snapshot.params.ingredientes),
    preparacion: new FormControl(this.rutaActiva.snapshot.params.preparacion)
  })

  constructor(private router:Router, private recetaService:RecetaService, private rutaActiva: ActivatedRoute) { 
    this.recetaService.getReceta(this.rutaActiva.snapshot.params.id).subscribe((resp: any)=> {
      this.recetas = resp
      console.log(resp)
    })
  }

  updateForm(form: any) {
    this.recetaService.updateReceta(form).subscribe((resp: any) => {
      timeMessage('Actualizando...', 1500).then(() => {
        console.log(resp)
        successDialog('Guardado')
        this.router.navigate(['/recetas'])
      })
    }, error => {
      errorMessage('Error, no se pudo guardar')
    });
  }

  ngOnInit(): void {
  }

}
