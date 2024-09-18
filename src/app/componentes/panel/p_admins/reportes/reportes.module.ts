import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';


import { MenuModule } from '../../menu/menu.module';
import { ReportesRoutingModule } from './reportes.routing.module';
import { ReportesComponent } from './reportes.component';




@NgModule({
  declarations: [
    ReportesComponent,
    
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class ReportesModule { }