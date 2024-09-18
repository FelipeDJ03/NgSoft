import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router) { }

  canActivate(): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.email) {
      return true; // El usuario está autenticado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }
  }
}