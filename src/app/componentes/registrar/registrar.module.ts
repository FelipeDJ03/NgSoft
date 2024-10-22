import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';
import { RegistrarComponent } from './registrar.component';
import { RegistrarRoutingModule } from './registrar-routing.module';



@NgModule({
  declarations: [
    RegistrarComponent,
    
  ],
  imports: [
    CommonModule,
    RegistrarRoutingModule,
    CompartirModule,
    
  ]
})
export class RegistrarModule { }
