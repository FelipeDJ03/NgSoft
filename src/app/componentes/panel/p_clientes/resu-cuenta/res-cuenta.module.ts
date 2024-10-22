import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';


import { MenuModule } from '../../menu/menu.module';
import { ResuCuentaComponent } from './resu-cuenta.component';
import { ResuCuentaRoutingModule } from './res-cuenta.router.module';



@NgModule({
  declarations: [
    ResuCuentaComponent,
    
  ],
  imports: [
    CommonModule,
    ResuCuentaRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class ResuCuentaModule { }
