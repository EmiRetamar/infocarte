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
  declarations: [ HomeComponent, CreateCarteleraComponent, EditCarteleraComponent, DeleteCarteleraComponent ],
  // entryComponents es una seccion donde se declaran componentes que no se cargan por selector,
  // sino que se cargan dinamicamente y nunca se mencionan en una plantilla de componente
  // https://code.i-harness.com/es/q/25ea1a0
  entryComponents: [
    DeleteCarteleraComponent
  ]
})
export class HomeModule { }
