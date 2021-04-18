import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { IluminacionComponent } from './components/iluminacion/iluminacion.component';
import { HomeComponent } from './components/main/home/home.component';
import { PendientesComponent } from './components/pendientes/pendientes.component';
import { PlantasComponent } from './components/plantas/plantas.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { EditRecetaComponent } from './components/edit-receta/edit-receta.component';
import { CheckAuthGuard } from './Guards/check-auth.guard';
import { ControlEspaciosComponent } from './components/control-espacios/control-espacios.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { HistorialComponent } from './components/historial/historial.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'app', component: AppComponent, canActivate:[CheckAuthGuard]},
  {path: 'home', component: HomeComponent, canActivate:[CheckAuthGuard]},
  {path: 'pendientes', component: PendientesComponent, canActivate:[CheckAuthGuard]},
  {path: 'plantas', component: PlantasComponent, canActivate:[CheckAuthGuard]},
  {path: 'iluminacion', component: IluminacionComponent, canActivate:[CheckAuthGuard]},
  {path: 'recetas', component: RecetasComponent, canActivate:[CheckAuthGuard]},
  {path: 'updateReceta/:id/:nombre/:ingredientes/:preparacion', component: EditRecetaComponent,canActivate:[CheckAuthGuard]},
  {path: 'espacios', component: ControlEspaciosComponent, canActivate:[CheckAuthGuard]},
  {path: 'miCuenta', component: MiCuentaComponent, canActivate:[CheckAuthGuard]},
  {path: 'historial', component: HistorialComponent, canActivate:[CheckAuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
