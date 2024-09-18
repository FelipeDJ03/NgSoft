import { Injectable,NgZone } from "@angular/core";
import { Router } from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@firebase/auth";
import { AdminService } from "./admin.service";

@Injectable({
    providedIn:'root'
})

export class AuthService{
    Datosusuario:any;

    constructor(
        private fas:AngularFireAuth,
        private adminservice:AdminService,
        private router:Router,
        private ngzone:NgZone,
    ){

    }

    async login_correo_pass(email: string, password: string) {
      try {
        const userCredential = await this.fas.signInWithEmailAndPassword(email, password);
        this.Datosusuario = userCredential.user; // Guarda los datos del usuario
        
        // Almacena el usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(this.Datosusuario));
     
        return userCredential.user; // Retorna el usuario
      } catch (error) {
     
        throw error; // Para que el componente pueda manejar el error
      }
    }
    


   

    registrar_correo_pass(email:string,password:string){
        return this.fas.createUserWithEmailAndPassword(email, password);
       
    }
    // registrar_correo_pass(email:string,password:string){
    //     return this.fas.createUserWithEmailAndPassword(email, password)
    //     .then((userCredential)=>{
    //         this.Datosusuario=userCredential.user
    //         this.observeUserState()
    //     })
    //     .catch((error)=>{
    //         alert(error.message);
    //     })
    // }





    get Logeado(): boolean{
        const user = JSON.parse(localStorage.getItem('usuario')!);
        return user !==null;
    }


    Cerrar_Sesion(){
        return this.fas.signOut();
    }

   
}