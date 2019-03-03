import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';

import { NotificacionesComponent } from './notificaciones.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [],
  declarations: [ NotificacionesComponent ],
  entryComponents: []
})
export class NotificacionesModule { }
