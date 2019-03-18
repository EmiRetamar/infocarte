import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CarteleraComponent } from './cartelera.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { AdministrarPermisosComponent } from './administrar-permisos/administrar-permisos.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule
  ],
  exports: [
    CarteleraComponent
  ],
  declarations: [ CarteleraComponent, CreatePostComponent, EditPostComponent, DeletePostComponent, AdministrarPermisosComponent ],
  entryComponents: [
    DeletePostComponent
  ]
})
export class CarteleraModule { }
