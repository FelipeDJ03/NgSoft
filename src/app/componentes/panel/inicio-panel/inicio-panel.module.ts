import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';

import { InicioComponent } from '../../inicio/inicio.component';
import { InicioPanelComponent } from './inicio-panel.component';
import { InicioPanelRoutingModule } from './inicio-panel.routing';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [
    InicioPanelComponent,
    
  ],
  imports: [
    CommonModule,
    InicioPanelRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class InicioPanelModule { }
