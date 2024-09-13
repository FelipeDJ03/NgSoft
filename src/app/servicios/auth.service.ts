import { Injectable,NgZone } from "@angular/core";
import { Router } from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@firebase/auth";

@Injectable({
    providedIn:'root'
})

export class authService{
    Datosusuario:any;

    constructor(
        private fas:AngularFireAuth,
        private router:Router,
        private ngzone:NgZone
    ){
        this.fas.authState.subscribe((user)=>{
            if(user){
                this.Datosusuario=user;
                localStorage.setItem('usuario',JSON.stringify(this.Datosusuario));
            }else{
                localStorage.setItem('usuario','null');
            }
        })
    }


    login_correo_pass(email:string,password:string){
        return this.fas.signInWithEmailAndPassword(email,password)
        .then((userCredential)=>{
            this.Datosusuario=userCredential.user
            this.observeUserState()
        })
        .catch((error)=>{
            alert(error.message);
        })
    }


    login_google(){
        return this.fas.signInWithPopup(new GoogleAuthProvider())
        .then(()=>this.observeUserState())
        .catch((error:Error)=>{
            alert(error.message);
        })
    }

    registrar_correo_pass(email:string,password:string){
        return this.fas.createUserWithEmailAndPassword(email, password)
        .then((userCredential)=>{
            this.Datosusuario=userCredential.user
            this.observeUserState()
        })
        .catch((error)=>{
            alert(error.message);
        })
    }


    observeUserState(){
        this.fas.authState.subscribe((userState)=>{
            userState && this.ngzone.run(()=> this.router.navigate(['inicio_panel']))
        })
    }


    get Logeado(): boolean{
        const user = JSON.parse(localStorage.getItem('usuario')!);
        return user !==null;
    }


    Cerrar_Sesion(){
        return this.fas.signOut().then(()=>{
            localStorage.removeItem('usuario');
            this.router.navigate(['login']);
        })
    }

}