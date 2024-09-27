import { Component } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';
import { suscripcionService } from 'src/app/servicios/suscripcion.service';

@Component({
  selector: 'app-gestionar-sus',
  templateUrl: './gestionar-sus.component.html',
  styleUrls: ['./gestionar-sus.component.scss']
})
export class GestionarSusComponent {
  public datos_usuario: any = {};
  public load_data = true;
  public restaurant:any = {};
  public usuarios: Array<any> = [];
  public productos = [
    {
      id:1,
      nombre: 'Básico',
      image: 'https://www.simpledte.cl/wp-content/uploads/2019/11/3-me%CC%81tricas-para-determinar-si-tu-modelo-de-suscripcio%CC%81n-funciona.png',
      precio: 10,
      periodo:'mensual'
    },
    {
      id:1,
      nombre: 'Básico',
      image: 'https://www.simpledte.cl/wp-content/uploads/2019/11/3-me%CC%81tricas-para-determinar-si-tu-modelo-de-suscripcio%CC%81n-funciona.png',
      precio: 10,
      periodo:'anual'
    },
    {
      id:2,
      nombre: 'Avanzado',
      image: 'https://www.simpledte.cl/wp-content/uploads/2019/11/3-me%CC%81tricas-para-determinar-si-tu-modelo-de-suscripcio%CC%81n-funciona.png',
      periodo:'mensual'
    },
    {
      id:2,
      nombre: 'Avanzado',
      image: 'https://www.simpledte.cl/wp-content/uploads/2019/11/3-me%CC%81tricas-para-determinar-si-tu-modelo-de-suscripcio%CC%81n-funciona.png',
      precio: 20,
      periodo:'anual'
    },
    {
      id:3,
      nombre: 'Premium',
      image: 'https://www.simpledte.cl/wp-content/uploads/2019/11/3-me%CC%81tricas-para-determinar-si-tu-modelo-de-suscripcio%CC%81n-funciona.png',
      precio: 30,
      periodo:'mensual'
    },
    {
      id:3,
      nombre: 'Premium',
      image: 'https://www.simpledte.cl/wp-content/uploads/2019/11/3-me%CC%81tricas-para-determinar-si-tu-modelo-de-suscripcio%CC%81n-funciona.png',
      precio: 30,
      periodo:'anual'
    }
  ];

  constructor(
    private adminservice:AdminService,
    private stripe:suscripcionService
  ){
    const usuario: any = localStorage.getItem('datos_usuario');
    this.datos_usuario = JSON.parse(usuario);
    this.obtener_restaurant(this.datos_usuario.alias)
  }

  obtener_restaurant(alias: any){
    this.adminservice.obtener_restaurante(alias).subscribe(
      res=>{
        this.restaurant = res;
        this.load_data=false;
      }
    )
  }

  pagar(producto: any) {
  
    producto.admin_nombre= this.datos_usuario.nombre;
    producto.restaurante =this.datos_usuario.alias;
    
    console.log('Producto recibido en el método pagar:', producto); // Verifica los datos
    this.stripe.onProceedToPay(producto);
  }

}
