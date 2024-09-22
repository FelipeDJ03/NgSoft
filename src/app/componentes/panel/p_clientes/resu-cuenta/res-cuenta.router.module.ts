import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ResuCuentaComponent } from './resu-cuenta.component';

const routes: Routes = [
  {path:'', component: ResuCuentaComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResuCuentaRoutingModule { }
