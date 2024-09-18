import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarAdminComponent } from './registrar-admin.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {path:'', component: RegistrarAdminComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarAdminRoutingModule { }