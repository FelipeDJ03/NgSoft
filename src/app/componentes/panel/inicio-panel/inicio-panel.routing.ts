import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPanelComponent } from './inicio-panel.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RegistrarAdminModule } from '../p_admins/registrar-admin/registrar-admin.module';

const routes: Routes = [
  {path:'', component: InicioPanelComponent,canActivate:[AuthGuard]},
  { path: 'panel/admin/registrar_usuario',loadChildren: () => import('../p_admins/registrar-admin/registrar-admin.module').then(m => m.RegistrarAdminModule) } ,
  { path: 'panel/admin/historial_pagos',loadChildren: () => import('../p_admins/historial-pagos/historial_pagos.module').then(m => m.HistororialPagosModule) } ,
  { path: 'panel/admin/suscripciones',loadChildren: () => import('../p_admins/suscripciones/suscripciones.module').then(m => m.SuscripcionesModule) } ,
  { path: 'panel/admin/reportes',loadChildren: () => import('../p_admins/reportes/reportes.module').then(m => m.ReportesModule) } ,

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  InicioPanelRoutingModule { }
