// Importar modulos y componentes
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { PostComponent } from './components/post/post.component';
import { CreateCarteleraComponent } from './components/home/create-cartelera/create-cartelera.component';
import { EditCarteleraComponent } from './components/home/edit-cartelera/edit-cartelera.component';
import { CreatePostComponent } from './components/cartelera/create-post/create-post.component';
import { EditPostComponent } from './components/cartelera/edit-post/edit-post.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { EditUserComponent } from './components/usuario/edit-user/edit-user.component';
import { CartelerasCreadasComponent } from './components/usuario/carteleras-creadas/carteleras-creadas.component';
import { CartelerasSeguidasComponent } from './components/usuario/carteleras-seguidas/carteleras-seguidas.component';
import { PostsCreadosComponent } from './components/usuario/posts-creados/posts-creados.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsuarioAutenticado } from './components/guards/usuario-autenticado';
import { UsuarioAdministrador } from './components/guards/usuario-administrador';
import { UsuarioProfesor } from './components/guards/usuario-profesor';
import { UsuarioAlumno } from './components/guards/usuario-alumno';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cartelera/:idCartelera', component: CarteleraComponent },
    { path: 'cartelera/:idCartelera/post/:idPost', component: PostComponent },
    { path: 'create-cartelera', component: CreateCarteleraComponent, canActivate: [ UsuarioAutenticado, UsuarioAdministrador ] },
    { path: 'edit-cartelera/:idCartelera', component: EditCarteleraComponent, canActivate: [ UsuarioAutenticado, UsuarioAdministrador ] },
    { path: 'cartelera/:idCartelera/create-post', component: CreatePostComponent, canActivate: [ UsuarioAutenticado, UsuarioProfesor ] },
    { path: 'cartelera/:idCartelera/edit-post/:idPost', component: EditPostComponent, canActivate: [ UsuarioAutenticado, UsuarioProfesor ] },
    { path: 'user/:idUser', component: PerfilComponent, canActivate: [ UsuarioAutenticado ] },
    { path: 'edit-user/:idUser', component: EditUserComponent, canActivate: [ UsuarioAutenticado ] },
    { path: 'carteleras-creadas', component: CartelerasCreadasComponent, canActivate: [ UsuarioAutenticado, UsuarioAdministrador ] },
    { path: 'carteleras-seguidas', component: CartelerasSeguidasComponent, canActivate: [ UsuarioAutenticado, UsuarioAlumno ] },
    { path: 'posts-creados', component: PostsCreadosComponent, canActivate: [ UsuarioAutenticado, UsuarioProfesor ] },
    { path: 'notificaciones', component: NotificacionesComponent, canActivate: [ UsuarioAutenticado, UsuarioAlumno ] },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
