import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { GestionarSusComponent } from './gestionar-sus.component';
import { CompraExitosaComponent } from './compra-exitosa/compra-exitosa.component';
import { CompraCanceladaComponent } from './compra-cancelada/compra-cancelada.component';

const routes: Routes = [
  {path:'', component: GestionarSusComponent,canActivate:[AuthGuard]},
  {path:'exitoso', component: CompraExitosaComponent,canActivate:[AuthGuard]},
  {path:'cancelado', component: CompraCanceladaComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionarSusRoutingModule { }
