import { Component } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  public pagos: Array<any> = [];
  public load_data=true;
  public alias=null;
  public datos_usuario: any = {};

  constructor(
    private adminservice:AdminService
  ){
    const usuario: any = localStorage.getItem('datos_usuario');
    this.datos_usuario = JSON.parse(usuario);
    this.obtener_pagos_suscripcion(this.datos_usuario.alias)
  }


  obtener_pagos_suscripcion(alias: any) {
    this.load_data = true; // Muestra el indicador de carga
  
    // Llamada al método del servicio
    this.adminservice.obtener_pagos_suscripcion(alias).subscribe(
      res => {
        this.pagos = res;  // Asignar la respuesta a la propiedad pagos
        this.load_data = false; // Ocultar el indicador de carga
        console.log(this.pagos)
        this.pagos=res.map((pago: any) => {
        
            pago.fecha = pago.fecha.toDate(); // Convertir a Date
       
          return pago;
        });
      },
      error => {
        console.error('Error al obtener pagos:', error);
        this.load_data = false; // Ocultar el indicador de carga en caso de error
      }
    );
  }
}
