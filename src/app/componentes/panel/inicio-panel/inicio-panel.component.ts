import { Component } from '@angular/core';
import { authService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-inicio-panel',
  templateUrl: './inicio-panel.component.html',
  styleUrls: ['./inicio-panel.component.scss']
})
export class InicioPanelComponent {

  constructor(
    private authservice:authService
  ){}


  Cerrar_sesion(){
    this.authservice.Cerrar_Sesion();
  }
}
