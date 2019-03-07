import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { CreateCarteleraComponent } from './create-cartelera/create-cartelera.component';
import { EditCarteleraComponent } from './edit-cartelera/edit-cartelera.component';
import { DeleteCarteleraComponent } from './delete-cartelera/delete-cartelera.component';
import { VerSeguidoresComponent } from './ver-seguidores/ver-seguidores.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [ HomeComponent, CreateCarteleraComponent, EditCarteleraComponent, DeleteCarteleraComponent, VerSeguidoresComponent ],
  entryComponents: [
    DeleteCarteleraComponent,
    VerSeguidoresComponent
  ]
})
export class HomeModule { }
