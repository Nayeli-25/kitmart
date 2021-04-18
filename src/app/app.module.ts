import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { HomeComponent } from './components/main/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PendientesComponent } from './components/pendientes/pendientes.component';
import { PlantasComponent } from './components/plantas/plantas.component';
import { IluminacionComponent } from './components/iluminacion/iluminacion.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { EditRecetaComponent } from './components/edit-receta/edit-receta.component';
import { ControlEspaciosComponent } from './components/control-espacios/control-espacios.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { HistorialComponent } from './components/historial/historial.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PendientesComponent,
    PlantasComponent,
    IluminacionComponent,
    RecetasComponent,
    EditRecetaComponent,
    ControlEspaciosComponent,
    MiCuentaComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
