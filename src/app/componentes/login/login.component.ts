import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Subscription } from 'rxjs';
import { user } from '@angular/fire/auth';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  public cargando = false;
  public usuario: any = {};
  public uid: any;



  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    // Puedes agregar suscripciones aquí si es necesario
    // this.authSubscription = this.authService.someObservable.subscribe(...);
  }

  login(LoginForm: { valid: any; }) {
    if (LoginForm.valid) {
      this.authService.login_correo_pass(this.usuario.email, this.usuario.password)
      .then((user) => {
        console.log("Usuario autenticado: ", user);
        this.router.navigate(['/panel/inicio_panel']); // Navegar a la página deseada
      })
      .catch((error) => {
        console.log("Error al iniciar sesión: ", error);
      });
    } else {
      // Notificación de error
    }
  }

  
}
