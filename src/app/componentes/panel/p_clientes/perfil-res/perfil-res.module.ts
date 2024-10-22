import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';


import { MenuModule } from '../../menu/menu.module';
import { PerfilResComponent } from './perfil-res.component';
import { PerfilResRoutingModule } from './perfil-res.router.module';




@NgModule({
  declarations: [
    PerfilResComponent,
    
  ],
  imports: [
    CommonModule,
    PerfilResRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class PerfilResModule { }
