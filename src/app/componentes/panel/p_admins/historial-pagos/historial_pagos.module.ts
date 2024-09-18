import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';


import { MenuModule } from '../../menu/menu.module';
import { HistorialPagosComponent } from './historial-pagos.component';
import { HistorialPagosRoutingModule } from './historial_pagos.routing.module';




@NgModule({
  declarations: [
    HistorialPagosComponent,
    
  ],
  imports: [
    CommonModule,
    HistorialPagosRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class HistororialPagosModule { }
