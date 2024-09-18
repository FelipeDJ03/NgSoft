import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';

import { RegistrarAdminRoutingModule } from './registrar-admin.router.module';
import { RegistrarAdminComponent } from './registrar-admin.component';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [
    RegistrarAdminComponent,
    
  ],
  imports: [
    CommonModule,
    RegistrarAdminRoutingModule,
    CompartirModule,
    MenuModule
    
  ]
})
export class RegistrarAdminModule { }
