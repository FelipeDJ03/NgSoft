import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';


import { MenuModule } from '../../menu/menu.module';
import { GestionarSusRoutingModule } from './gestionar-sus.router.module';
import { GestionarSusComponent } from './gestionar-sus.component';




@NgModule({
  declarations: [
    GestionarSusComponent,
    
  ],
  imports: [
    CommonModule,
    GestionarSusRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class GestionarSusModule { }
