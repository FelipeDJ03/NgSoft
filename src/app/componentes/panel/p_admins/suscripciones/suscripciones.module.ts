import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';


import { MenuModule } from '../../menu/menu.module';
import { SuscripcionesRoutingModule } from './suscripciones.routing.module';
import { SuscripcionesComponent } from './suscripciones.component';




@NgModule({
  declarations: [
    SuscripcionesComponent,
    
  ],
  imports: [
    CommonModule,
    SuscripcionesRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class SuscripcionesModule { }
