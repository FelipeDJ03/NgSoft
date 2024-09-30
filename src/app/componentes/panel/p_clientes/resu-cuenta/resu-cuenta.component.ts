import { Component } from '@angular/core';

@Component({
  selector: 'app-resu-cuenta',
  templateUrl: './resu-cuenta.component.html',
  styleUrls: ['./resu-cuenta.component.scss']
})
export class ResuCuentaComponent {
  public usuario:any={};
  public load_data=true;
  constructor(){
    const usuario: any = localStorage.getItem('datos_usuario');
    this.usuario = JSON.parse(usuario);
    this.load_data=false;
  }



  actualizar(actualizarForm:any){
    if(actualizarForm.valid){

    }else{
      
    }
  }
}
