import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './registrar.component';
import { NoAuthGuard } from 'src/app/guards/autenticado.guard';

const routes: Routes = [
  {path:'', component: RegistrarComponent,canActivate:[NoAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarRoutingModule { }
