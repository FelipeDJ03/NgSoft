import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialPagosComponent } from './historial-pagos.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {path:'', component: HistorialPagosComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialPagosRoutingModule { }
