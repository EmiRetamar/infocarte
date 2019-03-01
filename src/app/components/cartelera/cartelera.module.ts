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

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    /* "warnOnNgModelWithFormControl" evita el warning de usar "formControlName" y "[ngModel]"
    en el mismo campo del formulario, ya que esta deprecated y fue eliminado en Angular 7 */
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule
  ],
  exports: [
    CarteleraComponent
  ],
  declarations: [ CarteleraComponent, CreatePostComponent, EditPostComponent, DeletePostComponent ],
  entryComponents: [
    DeletePostComponent
  ]
})
export class CarteleraModule { }
