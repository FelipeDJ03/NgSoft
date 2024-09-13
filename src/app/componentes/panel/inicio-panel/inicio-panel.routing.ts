import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPanelComponent } from './inicio-panel.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {path:'', component: InicioPanelComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioPanelRoutingModule { }
