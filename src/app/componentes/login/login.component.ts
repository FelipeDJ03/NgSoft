import { Component } from '@angular/core';
import { authService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public cargando=false;
  public usuario : any ={};

  constructor(
    private authService:authService
  ){

  }


  login(LoginForm: { valid: any; }){
    if(LoginForm.valid){
      console.log(this.usuario.email,this.usuario.password)
    this.authService.login_correo_pass(this.usuario.email,this.usuario.password);
    }else{
      //notificacion de error
    }
  }

  login_google(){
    this.authService.login_google();
  }
}
