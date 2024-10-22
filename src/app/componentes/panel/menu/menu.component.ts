import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/servicios/admin.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public datos_usuario: any = {};

  constructor(
    private authservice:AuthService,
    private router:Router
  
  ){
    const usuario: any = localStorage.getItem('datos_usuario');
    this.datos_usuario = JSON.parse(usuario);
  }
  Cerrar_sesion(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('uid');
    localStorage.removeItem('datos_usuario');
    this.authservice.Cerrar_Sesion();
    this.router.navigate(['login']);

  }
}
