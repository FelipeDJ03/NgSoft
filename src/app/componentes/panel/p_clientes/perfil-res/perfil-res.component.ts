import { Component } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';

@Component({
  selector: 'app-perfil-res',
  templateUrl: './perfil-res.component.html',
  styleUrls: ['./perfil-res.component.scss']
})
export class PerfilResComponent {

  public cargando=false;
  public restaurant : any ={
    categoria:'',
    d_operacion: {
      lunes: false,
      martes: false,
      miercoles: false
  }
  };
  public info_res1 : any ={};
  public info_prop1 : any ={};
  public doc1 : any ={};
  public info_banco1 : any ={};
  public imgSeleccionadaPerfil: any | ArrayBuffer;
  public imgSeleccionadaFirma: any | ArrayBuffer;
  public imgFileLogo: any=undefined;
  public pdfSeleccionado: any;
  public pdfFile: any=undefined;
  public datos_usuario: any = {};
  public load_data=true;
  constructor(
    private adminservice:AdminService,
  ){
    const usuario: any = localStorage.getItem('datos_usuario');
    this.datos_usuario = JSON.parse(usuario);
    this.obtener_restaurant(this.datos_usuario.alias)
  }


  obtener_restaurant(alias: any){
    this.adminservice.obtener_restaurante(alias).subscribe(
      res=>{
        // Oculta el indicador de carga

        if(res == undefined){
          this.restaurant = undefined;
          this.load_data = false;
        }else{
          this.restaurant = res;   
          this.load_data = false; 
          this.imgSeleccionadaPerfil = this.restaurant.imagenURL;
        }
        
      }
    )
  }

  eventoCambioDeImagen(event: any, tipo: string): void {
    let file: any;
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
    } else {
      // No se seleccionó una imagen
    }
  
    if (file.size <= 4000000) {
      if (file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = e => {
   
            this.imgSeleccionadaPerfil = reader.result;
            this.imgFileLogo = new File([new Blob([file], { type: file.type })], file.name);
          
        }
        reader.readAsDataURL(file);
        const label = document.getElementById(tipo); // Asegúrate de que el elemento tenga un ID correspondiente
        if (label) {
          label.textContent = file.name;
        }
      } else {
        // Anuncio de que el archivo debe ser una imagen
        console.log('El archivo debe ser una imagen.');
      
          this.imgSeleccionadaPerfil = undefined;
          this.imgFileLogo = undefined;
       
      }
    } else {
      // Imagen no puede superar los 4MB
      console.log('La imagen no puede superar los 4MB.');
     
        this.imgSeleccionadaPerfil = undefined;
        this.imgFileLogo = undefined;

    }
  }
  eventoCambioDeDocumento(event: any): void {
    let file: any;
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
    } else {
      // No se seleccionó un archivo
      console.log('No se seleccionó ningún archivo.');
      return;
    }
  
    // Validar que el archivo no supere 4MB y sea de tipo PDF
    if (file.size <= 4000000) {
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
          this.pdfSeleccionado = reader.result;
          this.pdfFile = new File([new Blob([file], { type: file.type })], file.name);
        };
        reader.readAsDataURL(file);
        
        const label = document.getElementById('documento'); // ID del input de archivo
        if (label) {
          label.textContent = file.name;
        }
      } else {
        // Anuncio de que el archivo debe ser un PDF
        console.log('El archivo debe ser un PDF.');
        this.pdfSeleccionado = undefined;
        this.pdfFile = undefined;
      }
    } else {
      // El archivo no puede superar los 4MB
      console.log('El archivo no puede superar los 4MB.');
      this.pdfSeleccionado = undefined;
      this.pdfFile = undefined;
    }
  }


  info_res(info_resfrom:{valid:any;}){
    if(info_resfrom.valid){
      if(this.imgFileLogo == undefined){
      console.log('no hay logo del restaruante')
      }else{
        console.log(this.restaurant)
      }
    }
  }
}
