import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { errorMessage, successDialog, timeMessage } from 'src/app/functions/alerts';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  
  public user: any = ''
  userForm = new FormGroup ({
    email: new FormControl(this.rutaActiva.snapshot.params.email),
    password: new FormControl(this.rutaActiva.snapshot.params.password),
    password2: new FormControl(this.rutaActiva.snapshot.params.password2)
  })

  constructor(private router:Router, private userService:UsuarioService, private rutaActiva: ActivatedRoute, private fb:FormBuilder) { 
    this.userService.getUser().subscribe((resp: any)=> {
      this.user = resp
      console.log(resp)
    })
    this.createForm()
  }

  updateForm(form: any): void {
    if (this.userForm.invalid) {
      return Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched()
      })
    } else {
      this.userService.updateUser(form).subscribe((resp: any) => {
        timeMessage('Actualizando...', 1500).then(() => {
          console.log(resp)
          successDialog('Guardado')
        })
      }, error => {
        errorMessage('Error, no se actualizó la información')
      });
    }
  }

  createForm():void{
    this.userForm = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password:['', [Validators.required]],
      password2:['',[Validators.required]]
    });
  }

  get emailValidate() {
    return (
      this.userForm.get('email').invalid && this.userForm.get('email').touched
    )
  }

  get passwordValidate() {
    return (
      this.userForm.get('password').invalid && this.userForm.get('password').touched
    )
  }

  get password2Validate() {
    const pass = this.userForm.get('password').value
    const pass2 = this.userForm.get('password2').value

    return pass == pass2 ? false : true
  }
  
  ngOnInit(): void {
  }

}
