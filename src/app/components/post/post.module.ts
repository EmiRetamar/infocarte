import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { PostComponent } from './post.component';
import { DeleteComentarioComponent } from './delete-comentario/delete-comentario.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  declarations: [ PostComponent, DeleteComentarioComponent ],
  entryComponents: [
    DeleteComentarioComponent
  ]
})
export class PostModule { }
