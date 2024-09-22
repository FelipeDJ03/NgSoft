import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';


import { MenuModule } from '../../menu/menu.module';
import { HistorialComponent } from './historial.component';
import { HistorialRoutingModule } from './historial.router.module';




@NgModule({
  declarations: [
    HistorialComponent,
    
  ],
  imports: [
    CommonModule,
    HistorialRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class HistorialModule { }
