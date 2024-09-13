import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.development';
import{provideAuth,getAuth} from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { InicioPanelComponent } from './componentes/panel/inicio-panel/inicio-panel.component';
import { RegistrarModule } from './componentes/registrar/registrar.module';
import { LoginModule } from './componentes/login/login.module';
import { InicioPanelModule } from './componentes/panel/inicio-panel/inicio-panel.module';
import {AngularFireModule} from '@angular/fire/compat';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistrarModule,
    LoginModule,
    InicioPanelModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideAuth(()=>getAuth()),

    //solucionar el error nullinjectError
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
