import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/servicios/admin.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
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

  constructor(
    private adminService:AdminService,
    private authService: AuthService,
    private router: Router,

  ){

  }


////metodos para los formularios
  info_res(info_resfrom:{valid:any;}){
    if(info_resfrom.valid){
      if(this.imgFileLogo == undefined){
      console.log('no hay logo del restaruante')
      }else{
        console.log(this.restaurant)
      }
    }
  }
  info_prop(info_propform:{valid:any;}){
    if(info_propform.valid){
   
        console.log(this.restaurant)
      
    }
  }
  doc(docform:{valid:any;}){
    if(docform.valid){
          if(this.pdfFile == undefined){
          console.log('no hay pdf del restaruante')
          }else{
            console.log(this.restaurant)
          }
        }
  }

//metodos para insertar en bd
  async info_banco(info_bancoform:{valid:any;}){
    if(info_bancoform.valid){
      console.log(this.restaurant)
        try {
          this.restaurant.estado='inactivo';
          this.restaurant.plan='pendiente';
          this.restaurant.sus_inicio='pendiente';
          this.restaurant.sus_final='pendiente';
          const result = await this.adminService.agregarRestaurant(this.restaurant);
          this.restaurant.uid = result.id; // Obtén el UID del documento generado
          console.log(this.restaurant);
          const restaurantUID = result.id; // UID generado por Firestore

          // Subir la imagen a la carpeta res_logo
          const imagenURL = await this.adminService.subirImagenRestaurant(restaurantUID, this.imgFileLogo);
        
          // Subir el archivo PDF a la carpeta res_doc
          const pdfURL = await this.adminService.subirPDFRestaurant(restaurantUID, this.pdfFile);
        
          // Actualizar el documento del restaurante en Firestore con las URLs
          await this.adminService.actualizarRestaurant(restaurantUID, {
            imagenURL,
            pdfURL,
          });
          this.registrar_usuario(this.restaurant);
        }
          catch (error) {
            // Si ocurre algún error, lo muestra en consola
            console.error('Error durante el registro: ', error);
          }
  }
  }

  async registrar_usuario(restaurant: any) {
    // Procede a registrar el usuario con el UID del restaurante
     // Si el usuario se agregó correctamente, intenta registrar su autenticación
     const result = await this.adminService.registrar_correo_pass(this.restaurant.email, this.restaurant.password);
     console.log('Usuario agregado a autenticación con éxito');
     let data={
      uid:result.uid,
      alias:restaurant.uid,
      nombre:restaurant.nombre_propietario,
      apellido:restaurant.apellido,
      direccion:restaurant.direccion_p,
      celular:'null',
      permiso:'inactivo',
      rol:'administrador',
      image_url:'null',
      email:result.email,

    }
     this.registrar_usuario_firestorie(data);

  }  

async registrar_usuario_firestorie(usuario:any){
  // Intenta agregar los datos del usuario a Firestore
  await this.adminService.agregarUsuario(usuario);
  console.log('Usuario agregado a Firestore con éxito');
  window.alert('registro con exito');
  this.router.navigate(['/login']); // Navegar a la página deseada

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
  
  
}
