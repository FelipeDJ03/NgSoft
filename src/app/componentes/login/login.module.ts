import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirModule } from 'src/app/compartido.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';



@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CompartirModule,
    
  ]
})
export class LoginModule { }
