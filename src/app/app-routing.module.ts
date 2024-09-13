import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';

const routes: Routes = [
  {path:'', redirectTo: 'Inicio', pathMatch:'full'},

  {path:'Inicio',component:InicioComponent},
  { path: 'registrar',loadChildren: () => import('./componentes/registrar/registrar.module').then(m => m.RegistrarModule) } ,
  { path: 'login',loadChildren: () => import('./componentes/login/login.module').then(m => m.LoginModule) } ,
  { path: 'inicio_panel',loadChildren: () => import('./componentes/panel/inicio-panel/inicio-panel.module').then(m => m.InicioPanelModule) } ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
