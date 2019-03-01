import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { PerfilComponent } from './perfil/perfil.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CartelerasCreadasComponent } from './carteleras-creadas/carteleras-creadas.component';
import { CartelerasSeguidasComponent } from './carteleras-seguidas/carteleras-seguidas.component';
import { PostsCreadosComponent } from './posts-creados/posts-creados.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule
  ],
  exports: [],
  declarations: [ PerfilComponent, EditUserComponent, CartelerasCreadasComponent, CartelerasSeguidasComponent, PostsCreadosComponent ],
})
export class UsuarioModule { }
