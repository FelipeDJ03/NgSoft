import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';
import { ListaVentasRoutingModule } from './lista-ventas.router.module';
import { MenuModule } from '../../../menu/menu.module';
import { ListaVentasComponent } from './lista-ventas.component';





@NgModule({
  declarations: [
    ListaVentasComponent,
  ],
  imports: [
    CommonModule,
    ListaVentasRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class ListaVentasModule { }
