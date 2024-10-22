import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private firestore: AngularFirestore,private fas:AngularFireAuth, private storage: AngularFireStorage) {}
  
  registrar_correo_pass(email: string, password: string) {
    return this.fas.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Asegúrate de que `user` no sea null o undefined
        if (user) {
          return {
            email: user.email,
            uid: user.uid
          };
        } else {
          throw new Error('No se pudo obtener la información del usuario.');
        }
      })
      .catch((error) => {
        console.error('Error durante el registro: ', error);
        throw error;
      });
  }

  getDatausuarios() {
    return this.firestore.collection('usuarios').valueChanges();
  }

  agregarUsuario(usuario:any) {
    return this.firestore.collection('usuarios').doc(usuario.uid).set(usuario);
  }

 
  obtener_usuario(uid: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(uid).valueChanges();
  }


  //restaurant
  agregarRestaurant(restaurante: any) {
    return this.firestore.collection('restaurantes').add(restaurante); // Utiliza `add()` en lugar de `set()`
  }

  async subirImagenRestaurant(restaurantUID: string, file: File): Promise<string> {
    const filePath = `res_logo/${restaurantUID}.jpg`; // Ruta en Storage
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file); // Subir el archivo
  
    // Esperar a que la carga se complete
    await task.snapshotChanges().toPromise();
  
    // Obtener la URL de descarga del archivo subido
    return fileRef.getDownloadURL().toPromise();
  }

  async subirPDFRestaurant(restaurantUID: string, file: File): Promise<string> {
    const filePath = `res_doc/${restaurantUID}.pdf`; // Ruta en Storage
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file); // Subir el archivo
  
    // Esperar a que la carga se complete
    await task.snapshotChanges().toPromise();
  
    // Obtener la URL de descarga del archivo subido
    return fileRef.getDownloadURL().toPromise();
  }
 
  actualizarRestaurant(restaurantUID: string, data: any) {
    return this.firestore.collection('restaurantes').doc(restaurantUID).update(data);
  }

  getDatarestaurantes() {
    return this.firestore.collection('restaurantes').valueChanges();
  }

  obtener_restaurante(uid:any){
    return this.firestore.collection('restaurantes').doc(uid).valueChanges();
  }

  obtener_pagos_suscripcion(uid: any) {
    return this.firestore.collection('pagos_suscripcion', ref => 
      ref.where('restaurante', '==', uid) // Filtrar por el campo alias igual a uid
    ).valueChanges();
  }
 
}