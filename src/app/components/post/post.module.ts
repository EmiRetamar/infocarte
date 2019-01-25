import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { PostComponent } from './post.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    // Hay que exportarlo porque lo utiliza el routing en el contexto de app.module donde solo tienen alcance AppComponent y LoginComponent
    PostComponent
  ],
  declarations: [ PostComponent ]
})
export class PostModule { }
