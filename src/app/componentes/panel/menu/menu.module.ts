import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { MenuComponent } from './menu.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from 'src/app/app.component';


import { MenuRoutingModule } from './menu.routing.module';

import { CompartirModule } from 'src/app/compartido.module';
import { PerfilComponent } from '../perfil/perfil.component';



@NgModule({
  declarations: [
    MenuComponent,
    PerfilComponent
  ],
  imports: [
    MenuRoutingModule,
    CompartirModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }