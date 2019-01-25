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

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cartelera/:id', component: CarteleraComponent },
    { path: 'cartelera/:id/post/:title', component: PostComponent },
    { path: 'create-cartelera', component: CreateCarteleraComponent },
    { path: 'edit-cartelera/:id', component: EditCarteleraComponent },
    { path: 'cartelera/:id/create-post', component: CreatePostComponent },
    { path: 'cartelera/:id/edit-post/:title', component: EditPostComponent },
    // { path: '**', component: PageNotFoundComponent },
    // {path: 'projects', component: ProjectsComponent,canActivate:[AuthGuard]},
    { path: '', redirectTo: 'home', pathMatch: 'full' } // Cuando el path esta vacio se redirige a home, pathMatch va en el default siempre
];

// Las rutas se definen en RouterModule y se exportan para ser importadas por la clase AppModule
@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
// export const Routing = RouterModule.forRoot(appRoutes);
