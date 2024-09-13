import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';

import { InicioComponent } from '../../inicio/inicio.component';
import { InicioPanelComponent } from './inicio-panel.component';
import { InicioPanelRoutingModule } from './inicio-panel.routing';



@NgModule({
  declarations: [
    InicioPanelComponent,
    
  ],
  imports: [
    CommonModule,
    InicioPanelRoutingModule,
    CompartirModule,
    
  ]
})
export class InicioPanelModule { }
