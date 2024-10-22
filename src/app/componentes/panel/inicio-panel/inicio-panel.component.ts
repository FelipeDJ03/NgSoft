import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/servicios/admin.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-inicio-panel',
  templateUrl: './inicio-panel.component.html',
  styleUrls: ['./inicio-panel.component.scss']
})
export class InicioPanelComponent implements OnInit, OnDestroy {
  public usuarios: Array<any> = [];
  public restaurantes: Array<any> = [];
  public datos_usuario: any = {};
  public load_data = true;
  public uid: any;
  public usuario: any = {};
  public ventana=false;

  // Variables para almacenar las suscripciones
  private userSubscription: Subscription | undefined;
  private usuariosSubscription: Subscription | undefined;

  constructor(
    private adminservice: AdminService
  ) {
        var usuarioJson : any = localStorage.getItem('usuario');
        // Parsea el JSON para obtener el objeto usuario
        const usuario = JSON.parse(usuarioJson);
        // Asegúrate de que el objeto usuario tenga la propiedad uid
        this.uid = usuario.uid;
        //console.log(this.uid)
        this.obtener_usuario(this.uid);
  }

  ngOnInit(): void {
    
  }


  obtener_usuario(uid:any){
   this.userSubscription= this.adminservice.obtener_usuario(uid).subscribe((usuarioData) => {
      if (usuarioData) {
        localStorage.setItem('datos_usuario', JSON.stringify(usuarioData));
        localStorage.setItem('uid', uid); // Guarda el UID<
        this.llenar();

      }})

  }


  llenar(){
    const usuario: any = localStorage.getItem('datos_usuario');
    this.datos_usuario = JSON.parse(usuario);
    //console.log(this.datos_usuario);
    this.load_data = false;

    if(this.datos_usuario.rol==='propietario'){
      this.obtener_cuentas();
      this.obtener_restaurantes()
    }
  }


  obtener_cuentas(){
    // Almacenar la suscripción de la lista de usuarios
    this.usuariosSubscription = this.adminservice.getDatausuarios().subscribe(
      res => {
        this.usuarios = res;
        //console.log(this.usuarios);
      }
    );
  }
  obtener_restaurantes() {
    this.usuariosSubscription = this.adminservice.getDatarestaurantes().subscribe(
      res => {
        // Recorrer los restaurantes y convertir los campos sus_inicio y sus_final a Date
        this.restaurantes = res.map((restaurante: any) => {
          if (restaurante.sus_inicio && restaurante.sus_inicio.toDate) {
            restaurante.sus_inicio = restaurante.sus_inicio.toDate(); // Convertir a Date
          }
          if (restaurante.sus_final && restaurante.sus_final.toDate) {
            restaurante.sus_final = restaurante.sus_final.toDate(); // Convertir a Date
          }
          return restaurante;
        });
        console.log(this.restaurantes);
      }
    );
  }

  mostrar_usuarios(){
    this.ventana=true;
  }

  mostrar_restaurantes(){
    this.ventana=false;
  }


  // Desuscribirse de todas las suscripciones en ngOnDestroy()
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
    }
  }
}
