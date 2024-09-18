import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/servicios/admin.service';

@Component({
  selector: 'app-registrar-admin',
  templateUrl: './registrar-admin.component.html',
  styleUrls: ['./registrar-admin.component.scss']
})
export class RegistrarAdminComponent {
  public cargando=false;
  public usuario : any ={};


  constructor(
    private adminService:AdminService,
    private router: Router,

  ){

  }
  
  async registrar_auth(registrarForm: { valid: any; }){
    if(registrarForm.valid){
      
     
      try {
         // Si el usuario se agregó correctamente, intenta registrar su autenticación
         const result = await this.adminService.registrar_correo_pass(this.usuario.email, this.usuario.password);
         console.log('Usuario agregado a autenticación con éxito');
         
         this.usuario.password= 'null';
         this.usuario.rol='propietario';
         this.usuario.permiso='activo';
         this.usuario.uid=result.uid;
         this.registrar_firestore(this.usuario);
      } catch (error) {
        // Si ocurre algún error, lo muestra en consola
        console.error('Error durante el registro: ', error);
      }
    }else{
      //notificacion de error
    }
  }

 async registrar_firestore(usuario:any){
      
        // Intenta agregar los datos del usuario a Firestore
        await this.adminService.agregarUsuario(usuario);
        console.log('Usuario agregado a Firestore con éxito');
        this.router.navigate(['panel/inicio_panel'])
  }


}
