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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsuarioAutenticado } from './components/guards/usuario-autenticado';
import { UsuarioAdministrador } from './components/guards/usuario-administrador';
import { UsuarioProfesor } from './components/guards/usuario-profesor';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { EditUserComponent } from './components/usuario/edit-user/edit-user.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cartelera/:idCartelera', component: CarteleraComponent },
    { path: 'cartelera/:idCartelera/post/:idPost', component: PostComponent },
    { path: 'create-cartelera', component: CreateCarteleraComponent, canActivate: [ UsuarioAutenticado, UsuarioAdministrador ] },
    { path: 'edit-cartelera/:idCartelera', component: EditCarteleraComponent, canActivate: [ UsuarioAutenticado, UsuarioAdministrador ] },
    { path: 'cartelera/:idCartelera/create-post', component: CreatePostComponent, canActivate: [ UsuarioAutenticado, UsuarioProfesor ] },
    { path: 'cartelera/:idCartelera/edit-post/:idPost', component: EditPostComponent, canActivate: [ UsuarioAutenticado, UsuarioProfesor ] },
    { path: 'user/:idUser', component: PerfilComponent },
    { path: 'edit-user/:idUser', component: EditUserComponent },
    // { path: '**', component: PageNotFoundComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' } // Cuando el path esta vacio se redirige a home, pathMatch va en el default siempre
];

// Las rutas se definen en RouterModule y se exportan para ser importadas por la clase AppModule
@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
// export const Routing = RouterModule.forRoot(appRoutes);
