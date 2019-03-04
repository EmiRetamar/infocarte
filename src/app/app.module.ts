import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { CarteleraService } from './services/cartelera.service';
import { HomeModule } from './components/home/home.module';
import { CarteleraModule } from './components/cartelera/cartelera.module';
import { PostModule } from './components/post/post.module';
import { LocalStorageService } from './services/local-storage.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToasterService } from './services/toaster.service';
import { UsuarioModule } from './components/usuario/usuario.module';
import { NotificacionesModule } from './components/notificaciones/notificaciones.module';
import { UsuarioAutenticado } from './components/guards/usuario-autenticado';
import { UsuarioAdministrador } from './components/guards/usuario-administrador';
import { UsuarioProfesor } from './components/guards/usuario-profesor';
import { UsuarioAlumno } from './components/guards/usuario-alumno';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule, // BrowserModule lo necesita cualquier app que se renderice en el navegador
    CommonModule, // El modulo que incluye todas las directivas basicas de Angular como NgIf, NgForOf, etc
    AppRoutingModule, // El routing se importa como un modulo mas
    MaterialModule, // Modulo que importa todos los modulos necesarios para Angular Material
    ReactiveFormsModule,
    FormsModule, // Sirve para hacer "two way data binding" con la notacion [(ngModel)] en una etiqueta html
    HttpClientModule,
    HomeModule,
    CarteleraModule,
    PostModule,
    UsuarioModule,
    NotificacionesModule,
    /* Angular Firebase Modules */
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [
    AuthService,
    CarteleraService,
    LocalStorageService,
    ToasterService,
    UsuarioAutenticado,
    UsuarioAdministrador,
    UsuarioProfesor,
    UsuarioAlumno,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
