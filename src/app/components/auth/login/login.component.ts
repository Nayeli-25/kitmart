import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessage, successDialog, timeMessage } from 'src/app/functions/alerts';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  user:User;
  public token:String
  
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) {
    this.createForm();
    if (localStorage.getItem('personalToken')!="null"){
      this.router.navigate(['/home'])
    }
   }

  ngOnInit(): void {
  }
 
  login():void{
    if(this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched()
      });

    }else{
      this.setUser();
      console.log(this.authService.login(this.user).subscribe((data: any) => {
        timeMessage('Iniciando...', 1500).then(() => {
          successDialog('Iniciado').then(() => {
            this.router.navigate(['/home'])
            localStorage.setItem("personalToken",data.token)
          });
        });
      }, error => {
        errorMessage('Email o password incorrecto.')
      }));
    }
  }
  get emailValidate(){
      return(
      this.loginForm.get('email').invalid && this.loginForm.get('email').touched
      );
    }
  get passwordValidate(){
      return(
      this.loginForm.get('password').invalid && this.loginForm.get('password').touched
      );
    }
  createForm():void{
    this.loginForm = this.fb.group({
    email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
    password:['', [Validators.required]]
    })
  }
  setUser():void{
    this.user = {
    email: this.loginForm.get('email').value,
    password: this.loginForm.get('password').value
    };
  }
}