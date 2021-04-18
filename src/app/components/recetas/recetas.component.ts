import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { errorMessage, successDialog, timeMessage } from 'src/app/functions/alerts';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
 totalR=[1,2,3,4,5]
 public recetas:Array<any> = []
  recetaForm = new FormGroup ({
    nombre: new FormControl(''),
    ingredientes: new FormControl(''),
    preparacion: new FormControl('')
  })

  constructor(private recetaService:RecetaService, private router:Router, private rutaActiva: ActivatedRoute) { 
    this.recetaService.getRecetas().subscribe((resp: any)=> {
      this.recetas = resp
      console.log(resp)
    })
  }

  postForm(form: any) {
    this.recetaService.createReceta(form).subscribe((resp: any) => {
      timeMessage('Guardando...', 1500).then(() => {
        console.log(resp)
        successDialog('Guardado')
      })
    }, error => {
      errorMessage('Error, no se pudo guardar')
    });
  }

  eliminarReceta(id: number) {
    this.recetaService.deleteReceta(id).subscribe((resp: any) => {
      timeMessage('Eliminando...', 1500).then(() => {
        this.router.navigate(['/home'])
        console.log(resp)
        successDialog('Eliminada')
      })
    }, error => {
      errorMessage('Error, no se pudo eliminar')
    });
  }

  ngOnInit(): void {
  }

}
