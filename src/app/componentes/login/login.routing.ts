import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { NoAuthGuard } from 'src/app/guards/autenticado.guard';

const routes: Routes = [
  {path:'', component: LoginComponent,canActivate:[NoAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
