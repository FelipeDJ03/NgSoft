import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.email) {
      this.router.navigate(['/panel/inicio_panel']); // Redirige al panel si está autenticado
      return false; // Evita el acceso a login/registro
    } else {
      return true; // Permite acceso si no está autenticado
    }
  }
}