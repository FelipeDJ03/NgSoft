import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilComponent } from '../perfil/perfil.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
    {path:'cuenta/perfil', component: PerfilComponent, canActivate:[ AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }